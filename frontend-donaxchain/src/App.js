import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { FaHome, FaUserFriends, FaStore, FaCoins, FaGavel, FaHistory, FaUserCircle } from 'react-icons/fa';

const data = [
  { name: 'Lun', value: 100 },
  { name: 'Mar', value: 120 },
  { name: 'Mié', value: 90 },
  { name: 'Jue', value: 140 },
  { name: 'Vie', value: 110 },
  { name: 'Sáb', value: 160 },
  { name: 'Dom', value: 130 },
];

function Navbar() {
  const location = useLocation();
  return (
    <nav className="navbar improved-navbar">
      <Link to="/dashboard" className={location.pathname === '/dashboard' || location.pathname === '/' ? 'active' : ''}><FaHome /> <span>Inicio</span></Link>
      <Link to="/contacts" className={location.pathname === '/contacts' ? 'active' : ''}><FaUserFriends /> <span>Contactos</span></Link>
      <Link to="/market" className={location.pathname === '/market' ? 'active' : ''}><FaStore /> <span>Marketplace</span></Link>
      <Link to="/staking" className={location.pathname === '/staking' ? 'active' : ''}><FaCoins /> <span>Staking</span></Link>
      <Link to="/governance" className={location.pathname === '/governance' ? 'active' : ''}><FaGavel /> <span>Gobernanza</span></Link>
      <Link to="/history" className={location.pathname === '/history' ? 'active' : ''}><FaHistory /> <span>Historial</span></Link>
      <Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''}><FaUserCircle /> <span>Perfil</span></Link>
    </nav>
  );
}

function Dashboard() {
  return (
    <div className="dashboard improved-dashboard">
      <header className="dashboard-header">
        <img src="/logo192.png" alt="DonaxChain Logo" className="logo-big" />
        <h2>Bienvenido a DonaxChain</h2>
      </header>
      <section className="saldo improved-saldo">
        <h3>Su saldo:</h3>
        <div className="saldo-valor">N/. 85.035</div>
      </section>
      <section className="transacciones">
        <h4>Transacciones recientes</h4>
        <ul>
          <li><b>Diego Segura</b> <span className="recibido">N/. 3.456</span></li>
          <li><b>Felipe Reyes</b> <span className="enviado">N/. 25.045</span></li>
          <li><b>Roger Moreno</b> <span className="recibido">N/. 50.041</span></li>
        </ul>
        <div className="acciones">
          <button>Transferir</button>
          <button>Convertir</button>
        </div>
      </section>
      <section className="market improved-market">
        <h4>Valor de mercado de NEKOINS</h4>
        <ResponsiveContainer width="100%" height={140}>
          <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#ffe066" strokeWidth={3} dot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </section>
      <section className="notificaciones improved-notificaciones">
        <h4>Notificaciones</h4>
        <ul>
          <li>¡Transferencia exitosa!</li>
          <li>Has recibido un DonaxBadge NFT</li>
        </ul>
      </section>
    </div>
  );
}

function Contacts() {
  return (
    <div className="dashboard improved-dashboard">
      <h2>Contactos</h2>
      <input type="text" placeholder="Buscar contacto..." className="input-search" />
      <ul className="contact-list">
        <li>Diego Segura <button>Transferir</button></li>
        <li>Felipe Reyes <button>Transferir</button></li>
        <li>Roger Moreno <button>Transferir</button></li>
      </ul>
      <p className="desc">Aquí puedes buscar y transferir NEKOINS a tus contactos.</p>
    </div>
  );
}

function Marketplace() {
  return (
    <div className="dashboard improved-dashboard">
      <h2>Marketplace Solidario</h2>
      <div className="market-items">
        <div className="market-item">
          <h4>Descuento ONG A</h4>
          <p>Canjea 100 NEKOINS por 10% de descuento en productos solidarios.</p>
          <button>Canjear</button>
        </div>
        <div className="market-item">
          <h4>Producto ONG B</h4>
          <p>Canjea 200 NEKOINS por una camiseta solidaria.</p>
          <button>Canjear</button>
        </div>
      </div>
      <p className="desc">Canjea tus NEKOINS por productos y servicios de ONGs aliadas.</p>
    </div>
  );
}

function Staking() {
  return (
    <div className="dashboard improved-dashboard">
      <h2>Staking de NEKOINS</h2>
      <p>Bloquea tus NEKOINS y gana recompensas adicionales y reputación en la comunidad.</p>
      <div className="staking-box">
        <input type="number" placeholder="Cantidad a bloquear" />
        <button>Bloquear</button>
      </div>
      <ul className="staking-list">
        <li>Has bloqueado: <b>1000 NEKOINS</b></li>
        <li>Recompensa estimada: <b>50 NEKOINS/mes</b></li>
      </ul>
    </div>
  );
}

function Governance() {
  return (
    <div className="dashboard improved-dashboard">
      <h2>Gobernanza DAO</h2>
      <p>Participa en la toma de decisiones de la plataforma votando con tus NEKOINS.</p>
      <div className="governance-box">
        <h4>Votación activa</h4>
        <p>¿Qué proyecto solidario debería recibir prioridad?</p>
        <button>ONG A</button> <button>ONG B</button> <button>ONG C</button>
      </div>
      <ul className="governance-list">
        <li>Tu voto: <b>ONG A</b></li>
        <li>Próxima votación: Mejoras en la plataforma</li>
      </ul>
    </div>
  );
}

function History() {
  return (
    <div className="dashboard improved-dashboard">
      <h2>Historial de Donaciones y NFTs</h2>
      <ul className="history-list">
        <li>Donación a ONG A - 500 NEKOINS - <span className="badge">DonaxBadge NFT</span></li>
        <li>Donación a ONG B - 200 NEKOINS - <span className="badge">DonaxBadge NFT</span></li>
      </ul>
      <p className="desc">Consulta todas tus donaciones y los NFTs recibidos como reconocimiento.</p>
    </div>
  );
}

function Profile() {
  return (
    <div className="dashboard improved-dashboard">
      <h2>Perfil de Usuario</h2>
      <ul className="profile-list">
        <li><b>Usuario:</b> usuario123</li>
        <li><b>Correo:</b> usuario@email.com</li>
        <li><b>Teléfono:</b> +51 999 999 999</li>
        <li><b>Clave privada:</b> 4758</li>
      </ul>
      <button className="logout">Cerrar sesión</button>
      <p className="desc">Gestiona tu información personal y seguridad.</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="app-bg">
        <div className="centered-container">
          <Navbar />
          <div className="main-content improved-main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/market" element={<Marketplace />} />
              <Route path="/staking" element={<Staking />} />
              <Route path="/governance" element={<Governance />} />
              <Route path="/history" element={<History />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
