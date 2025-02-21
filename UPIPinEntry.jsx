import React from 'react';
import { useHistory } from 'react-router-dom';

class UPIPinEntry extends React.Component {
    constructor(props) {
        super(props);
        this.history = useHistory();
    }

    handleCancelTransaction = () => {
        if (window.confirm("Do you want to cancel the transaction?")) {
            this.history.push('/wallet');
        }
    };

    render() {
        return (
            <div>
                {/* Render UPI Pin Entry Form */}
                <button onClick={this.handleCancelTransaction}>Cancel Transaction</button>
            </div>
        );
    }
}

export default UPIPinEntry;
