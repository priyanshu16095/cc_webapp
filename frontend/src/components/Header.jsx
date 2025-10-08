import React from 'react';
export default function Header() {
  return (
    <header className="header">
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ margin: 0 }}>FoodShare</h1>
          <div className="small" style={{ color: "white" }}>Community food collection & distribution — aligned with SDG 2</div>
        </div>
        <div className="small">Local-focused • Volunteer-driven</div>
      </div>
    </header>
  );
}