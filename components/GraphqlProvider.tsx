import React from 'react';
import { Channel, Socket as PhoenixSocket } from 'phoenix';
import { subscriptionExchange, cacheExchange, fetchExchange, Provider, Client } from 'urql';
import { make, pipe, toObservable } from 'wonka'

export const GraphqlProvider = ({ children }: { children: React.ReactNode }) => { 
    const base_url = "stat-api.gigalixirapp.com/"
    const phoenixSocketWsUrl = `ws://${base_url}/socket`
    const httpUrl = `https://${base_url}/api/graphql`
    

    // TODO: may need to put this in a useEffect
    const socket = new PhoenixSocket(phoenixSocketWsUrl);
    socket.connect()
    const absintheChannel = socket.channel('__absinthe__:control')
    absintheChannel.join()

    const absintheExchange = subscriptionExchange({
        forwardSubscription({ query, variables }) {
          let subscriptionChannel: Channel
      
          const source = make((observer) => {
            const { next } = observer
      
            absintheChannel.push('doc', { query, variables }).receive('ok', (v) => {
              const subscriptionId = v.subscriptionId
      
              if (subscriptionId) {
                subscriptionChannel = socket.channel(subscriptionId)
                subscriptionChannel.on('subscription:data', (value) => {
                  next(value.result)
                })
              }
            })
      
            return () => {
              subscriptionChannel?.leave()
            }
          })
      
          return pipe(source, toObservable)
        },
      })
    

    const client = new Client({
        url: httpUrl,
        exchanges: [
        cacheExchange,
        fetchExchange,
        absintheExchange
        ]
    })

    return (
        <Provider value={client}>
            {children}
        </Provider>
    )
}