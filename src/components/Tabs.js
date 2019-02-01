import React, { Component } from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  tabButton: {
    padding: '0.5rem',
    fontSize: '16px',
    borderColor: 'white',
    borderLeft: '1px',
    borderTop: '1px',
  },
};

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 0,
    };
  }
  render() {
    const { sections, content, classes } = this.props;
    return (
      <div>
        <div id="tab-sections">
          <div style={{ flexGrow: 0.1, borderBottom: '1px solid white', height: '35px', position: 'relative', left: '1px' }} />
          {sections.map((section, index) => {
            return (
              <div className={'tab-section ' + (index === 0 ? 'first' : '') + (this.state.selectedTab === index ? ' selected' : '')}>
                <ButtonBase
                  className={classes.tabButton}
                  onClick={() => this.setState({ selectedTab: index })}
                >
                  <div className="tab-text">{section}</div>
                </ButtonBase>
              </div>
            );
          })}
          <div style={{ flexGrow: 1, borderBottom: '1px solid white', height: '34px', position: 'relative', right: '1px' }} />
        </div>
        <div id="tab-content">
          {content[this.state.selectedTab]}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Tabs);
