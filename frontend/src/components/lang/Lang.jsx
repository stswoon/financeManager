import React from "react";
import {Button} from "antd";
const ButtonGroup = Button.Group;


class Lang extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    changeLang = (lang) => this.props.onChange(lang);

    render() {
        return (
            <ButtonGroup>
                <Button onClick={() => this.changeLang("en")}>EN</Button>
                <Button onClick={() => this.changeLang("ru")}>Ру</Button>
            </ButtonGroup>
        )
    }
}

export default Lang;

