import React from "react";
import './TabCard.scss';

export default class TabCard extends React.Component<any, any>{

    public state: {
        width?: number | string;
    }

    constructor(props: any) {
        super(props);
        this.state = {
        }

        console.log(this.props)
    }


    render = () => {
        return <>
            <div className="tab-card" style={{ width: this.props.width ? this.props.width : '100%', minHeight: 150 }}>
                <div className="title">879798</div>
                <div className="content"></div>
                <div className="bottom">5646</div>
            </div>
        </>;
    }
}