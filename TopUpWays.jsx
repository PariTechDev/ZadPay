import React, { Component } from 'react';

class TopUpWays extends Component {
    state = {
        selectedBank: '',
    };

    handleBankSelection = (bank) => {
        this.setState({ selectedBank: bank });
    };

    render() {
        const { topUpAmount } = this.props;
        return (
            <div>
                <button onClick={() => this.handleBankSelection('Bank A')}>Bank A</button>
                <button onClick={() => this.handleBankSelection('Bank B')}>Bank B</button>
                {this.state.selectedBank && (
                    <div>
                        <p>Selected Bank: {this.state.selectedBank}</p>
                        <p>Top-Up Amount: {topUpAmount}</p>
                    </div>
                )}
            </div>
        );
    }
}

export default TopUpWays;
