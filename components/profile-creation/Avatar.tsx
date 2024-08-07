import { createAvatar, Style } from "@dicebear/core";
import { useEffect, useState } from "react";
import * as collection from "@dicebear/collection";
import { StepProps } from "./Utils";

interface StyleOptionProps {
    index: number;
    image: Result;
    imageAlt: string;
    style: string;
    selected: boolean;
    onClick: () => void;
}

export function StyleOption(props: StyleOptionProps) {
    const hasBorder = props.selected ? "border-2 border-blue-500" : "";
    const [png, setPng] = useState<string | undefined>(undefined);


    useEffect(() => {
        props.image.toDataUri().then((dataUri) => {
            setPng(dataUri);
        })
        .catch((error) => {
            console.error(error);
        })
    }, [props.image]);/home/eharvey/stat-journal/api/frontend/src/components/profile-creation

    return png ? (
                <img 
                    key={props.index} 
                    src={png} 
                    alt={props.imageAlt} 
                    onClick={props.onClick} 
                    title={props.style}
                    style={{
                        border: hasBorder? "2px solid blue" : "none",
                        height: "10rem"
                    }}
                />
            ) : (
                <Skeleton.Avatar active style={{height: "10rem", width: "10rem"}} />
            )
    
}

function camelCaseToSnakeCase(camelCase: string, sep: string = "-") {
    return camelCase.replace(/[A-Z]/g, (letter) => `${sep}${letter.toLowerCase()}`);
}

export function StyleSelect(props: StepProps) {
    const [selectedStyleIndex, setSelectedStyleIndex] = useState(-1);
    const buttonIsDisabled = selectedStyleIndex < 0;

    const avatar = props.currentUserContext.me?.public?.avatar;

    const submitAvatarMutation = () => {
        if (buttonIsDisabled) {
            return;
        }

        const style = camelCaseToSnakeCase(
            Object.keys(collection)[selectedStyleIndex] as keyof typeof collection);
        const options = JSON.stringify(
            {seed: props.currentUserContext.me?.public?.username || ""}
        )

    }

    useEffect(() => {
        if (avatar) {
            props.notifyStatus("finish");
        }
    }, [avatar])

    const username = props.currentUserContext.me?.public?.username || "";

    const styles = Object.keys(collection).map((styleName, index) => {
        let style = collection[styleName as keyof typeof collection];
        let exampleAvatar = createAvatar(style as Style<{ seed: String; }>, { seed: username });

        return {
            index: index,
            image: toPng(exampleAvatar.toString()),
            imageAlt: styleName,
            style: styleName,
            selected: selectedStyleIndex === index,
            onClick: () => { setSelectedStyleIndex(index); console.log(`Selected ${index}`) }
        }
    });

    return (
        <>
            <Button disabled={buttonIsDisabled} onClick={submitAvatarMutation}>Submit</Button>

            <Flex wrap gap="middle">
                {styles.map((style) => <StyleOption key={style.index} {...style} />)}
            </Flex>
        </>          
    )
}