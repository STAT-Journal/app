import { CurrentUserContextInterface } from "../../providers/CurrentUser";

export interface StepProps {
    notifyStatus: (status: "process" | "finish" | "error") => void;
    setError: (message: string | undefined) => void;
    currentUserContext: CurrentUserContextInterface;
}