import React from "react";
import { Button } from "react-native-paper";

export default function Moment() {
    return (
        <div className="flex justify-center border">
            <div className="inline-flex space-x-1">
                <div className="">
                    chart here
                </div>
                <div className="flex-row space-y-1">
                    <Button>😞</Button>
                    <Button>😀</Button>
                </div>
            </div>
        </div>
    );
}