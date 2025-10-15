import React from "react";

const UserAvatarImg = () => {
  return (
    <div className="d-flex align-items-center gap-2">
      <img 
        src="https://i.pravatar.cc/40" 
        alt="avatar" 
        className="avatar rounded-circle" 
      />
      <div>
        <h6 className="mb-0">Rinku Verma</h6>
        <small>@RinkuV37</small>
      </div>
    </div>
  );
};

export default UserAvatarImg;