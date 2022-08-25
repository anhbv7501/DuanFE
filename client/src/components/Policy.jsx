import React from "react";

function Policy(props) {
  const { policys } = props;

  return (
    <div className="policy">
      {policys.map((policy, index) => (
        <div key={index} className="policy__item">
          <div className="policy__item_icon">{policy.icon}</div>
          <div className="policy__item_box">
            <h2>{policy.name}</h2>
            <p>{policy.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Policy;
