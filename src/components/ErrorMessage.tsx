interface IErrorMessageProps {
    errorMessage: string
}

function ErrorMessage(props: IErrorMessageProps) {
    return (<p className="alert">{props.errorMessage}</p>)
}

export default ErrorMessage