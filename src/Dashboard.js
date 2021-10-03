import React from 'react';
import { getUser, removeUserSession } from './Utils/Common';
import 'bootstrap/dist/css/bootstrap.min.css';

function Dashboard(props) {
  const user = getUser();

  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    props.history.push('/login');
  }

  return (
    <div className="bg-light ">
      <h2>Dobrodošli {user.firstName} {user.lastName}!<br /></h2>
      <br />
          <input type="button" className="btn btn-secondary" onClick={handleLogout} value="Logout" />

    </div>
  );
}

export default Dashboard;
