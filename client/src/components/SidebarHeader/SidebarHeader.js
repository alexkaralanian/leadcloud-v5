import React, {Component} from 'react';

class SidebarHeader extends Component {

  render() {
    return (
      <div className="sidebar-header">
          <img src={'img/avatars/8.jpg'} className="img-avatar" alt="Avatar"/>
          <div><strong>JOHN DOE</strong></div>
          <div className="text-muted"><small>Founder &amp; CEO</small></div>
          <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
            <button type="button" className="btn btn-link">
              <i className="icon-settings"></i>
            </button>
            <button type="button" className="btn btn-link">
              <i className="icon-speech"></i>
            </button>
            <button type="button" className="btn btn-link">
              <i className="icon-user"></i>
            </button>
          </div>
        </div>
    )
  }
}

export default SidebarHeader;
