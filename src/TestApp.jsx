export default function TestApp() {
  return (
    <div style={{ 
      padding: '40px', 
      background: '#111', 
      color: '#fff', 
      fontFamily: 'sans-serif',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div>
        <h1>✅ PulseLink Frontend is Running!</h1>
        <p style={{ fontSize: '18px', marginTop: '20px' }}>Mode: Local (no backend required)</p>
        <p style={{ fontSize: '18px' }}>Frontend: http://localhost:5173</p>
      </div>
    </div>
  );
}
