import * as React from 'react';
import { FAB, Portal } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

interface Props {
    openTextEntry: () => void;
}
    


const SpeedDial: React.FC<Props>= ({openTextEntry}) =>{
    const [state, setState] = React.useState({ open: false });

    const onStateChange = ({ open }: { open: boolean }) => setState({ open });

    const { open } = state;

  return (
    
      <Portal>
        <FAB.Group
          open={open}
          visible
          fabStyle={styles.fab}
          style={styles.group}
          icon={open ? 'notebook-outline' : 'plus'}
          actions={[
            { icon: 'plus', onPress: () => console.log('Pressed add') },
            {
              icon: 'microphone-variant',
              label: 'Audio',
              onPress: () => console.log('Pressed audio'),
            },
            {
              icon: 'image',
              label: 'Image',
              onPress: () => console.log('Pressed image'),
            },
            {
                icon: 'text',
                label: 'Text',
                onPress: () => {
                    openTextEntry();
                }
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>
    
  );
};

export default SpeedDial;


const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 0,
        right: 0,
        bottom: heightPercentageToDP(-9),
        backgroundColor: 'silver',

        alignContent: 'center',
        justifyContent: 'center',
    },
    group: {
        paddingBottom: heightPercentageToDP(17),
        paddingRight:widthPercentageToDP(7),
    },
})