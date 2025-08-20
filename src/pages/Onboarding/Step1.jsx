import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useOnboarding } from "../../context/OnboardingContext";
import Footer from "../../components/layout/Footer"; // Add this import at the top
/* =================== Animations =================== */
const floatUp = keyframes`
  from { opacity: 0; transform: translateY(10px) scale(.98); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
`;

const hueShift = keyframes`
  0% { filter: hue-rotate(0deg) }
  100% { filter: hue-rotate(360deg) }
`;

const bgDrift = keyframes`
  0% { transform: translate3d(0,0,0) scale(1.05); }
  50% { transform: translate3d(-2%, -2%, 0) scale(1.08); }
  100% { transform: translate3d(0,0,0) scale(1.05); }
`;

const orbFloat = keyframes`
  0% { transform: translateY(0) translateX(0) }
  50% { transform: translateY(-20px) translateX(10px) }
  100% { transform: translateY(0) translateX(0) }
`;

const borderRun = keyframes`
  0% { background-position: 0% 50% }
  100% { background-position: 200% 50% }
`;

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(255,255,255,0.3); }
  50% { box-shadow: 0 0 0 10px rgba(255,255,255,0); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

/* =================== Layout =================== */
const Container = styled.div`
  min-height: 100vh;
  font-family: 'Inter', system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  color: #0b1020;
  position: relative;
  overflow: hidden;

  /* Animated multi-color gradient background */
  &:before, &:after {
    content: "";
    position: fixed;
    inset: -20%;
    z-index: -2;
    background: radial-gradient(1200px 600px at 80% -10%, rgba(255,0,128,0.25), transparent 60%),
                radial-gradient(1200px 600px at -20% 110%, rgba(0,200,255,0.25), transparent 60%),
                radial-gradient(900px 500px at 50% 120%, rgba(0,255,150,0.25), transparent 60%),
                linear-gradient(135deg, #0b1020 0%, #0b0f2b 30%, #101a3a 100%);
    animation: ${bgDrift} 16s ease-in-out infinite;
    filter: saturate(1.15);
  }
  &:after {
    mix-blend-mode: screen;
    opacity: .65;
    animation-duration: 22s;
  }
`;

const OrbsLayer = styled.div`
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  filter: blur(18px);
  animation: ${hueShift} 24s linear infinite;
  > i {
    position: absolute;
    border-radius: 999px;
    opacity: 0.55;
    will-change: transform;
    mix-blend-mode: screen;
  }
  > i:nth-child(1) {
    width: 360px; height: 360px; left: -40px; top: 10%;
    background: radial-gradient(circle at 30% 30%, #ff7b7b, transparent 60%);
    animation: ${orbFloat} 8s ease-in-out infinite;
  }
  > i:nth-child(2) {
    width: 280px; height: 280px; right: 8%; top: 20%;
    background: radial-gradient(circle at 70% 30%, #7bffdc, transparent 60%);
    animation: ${orbFloat} 10s ease-in-out infinite .6s;
  }
  > i:nth-child(3) {
    width: 400px; height: 400px; left: 20%; bottom: -60px;
    background: radial-gradient(circle at 50% 50%, #7bc3ff, transparent 60%);
    animation: ${orbFloat} 12s ease-in-out infinite 1s;
  }
`;

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
  padding: .9rem 1.2rem;
  background: rgba(255,255,255,0.12);
  backdrop-filter: blur(14px) saturate(1.2);
  -webkit-backdrop-filter: blur(14px) saturate(1.2);
  border-bottom: 1px solid rgba(255,255,255,0.18);
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: .75rem;
`;

const Logo = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 12px;
  background: conic-gradient(from 0deg, #00d1ff, #00ffa3, #ffd400, #ff56b6, #7b61ff, #00d1ff);
  animation: ${hueShift} 10s linear infinite;
  box-shadow: 0 8px 26px rgba(0,0,0,.25), 0 0 0 2px rgba(255,255,255,.25) inset;
`;

const BrandName = styled.span`
  font-weight: 900;
  font-size: 1.1rem;
  letter-spacing: .4px;
  color: #f8fafc;
  text-shadow: 0 1px 0 rgba(0,0,0,.25);
`;

const StepBadge = styled.span`
  font-size: .85rem;
  padding: .35rem .65rem;
  border-radius: 999px;
  color: #0a2b22;
  background: linear-gradient(135deg, rgba(255,255,255,.85), rgba(255,255,255,.65));
  border: 1px solid rgba(255,255,255,.8);
`;

const Content = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
  padding: 2.2rem 1rem 3rem;
`;

const Card = styled.div`
  width: 100%;
  max-width: 1020px;
  border-radius: 22px;
  padding: 1.2rem;
  background: rgba(255,255,255,0.18);
  backdrop-filter: blur(16px) saturate(1.1);
  -webkit-backdrop-filter: blur(16px) saturate(1.1);
  border: 1px solid rgba(255,255,255,0.28);
  position: relative;
  animation: ${floatUp} .35s ease-out both;

  /* animated rainbow border */
  &:before {
    content: "";
    position: absolute;
    inset: -2px;
    border-radius: 24px;
    padding: 2px;
    background: linear-gradient(90deg,
      #00d1ff, #00ffa3, #ffd400, #ff56b6, #7b61ff, #00d1ff);
    background-size: 300% 100%;
    -webkit-mask: 
      linear-gradient(#000 0 0) content-box, 
      linear-gradient(#000 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
    animation: ${borderRun} 6s linear infinite;
    pointer-events: none;
  }

  @media (min-width: 950px) {
    display: grid;
    grid-template-columns: 1.2fr .9fr;
    gap: 1rem;
    padding: 1.4rem;
  }
`;

const CardLeft = styled.div`
  padding: .75rem;
  color: #0f172a;
`;

const Headline = styled.h2`
  margin: 0 0 .5rem 0;
  font-size: clamp(1.4rem, 1.1rem + 1.4vw, 2.2rem);
  line-height: 1.15;
  font-weight: 900;
  letter-spacing: -0.02em;
  color: #ffffff;
  text-shadow: 0 2px 18px rgba(0, 0, 0, .35);
`;

const RainbowText = styled.span`
  background: linear-gradient(90deg,#00e5ff,#00ffa3,#ffd400,#ff56b6,#7b61ff,#00e5ff);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: ${borderRun} 8s linear infinite;
`;

const Sub = styled.p`
  margin: 0 0 1rem 0;
  color: #e6f4ff;
  opacity: .95;
`;

const ActionsRow = styled.div`
  display: flex;
  gap: .75rem;
  flex-wrap: wrap;
  margin: 1rem 0 1.1rem;
`;

const ButtonBase = styled.button`
  border: none;
  border-radius: 14px;
  padding: .95rem 1.2rem;
  font-weight: 800;
  font-size: .95rem;
  letter-spacing: .2px;
  cursor: pointer;
  transition: transform .15s ease, box-shadow .2s ease, filter .2s ease, background .2s ease;
  display: inline-flex;
  align-items: center;
  gap: .6rem;
  position: relative;
  will-change: transform;

  &:disabled {
    opacity: .6;
    cursor: not-allowed;
  }
  &:active:not(:disabled) { transform: translateY(1px) scale(.995); }
`;

const ButtonPrimary = styled(ButtonBase)`
  color: #071a1a;
  background: linear-gradient(135deg, #00ffa3, #00d1ff);
  box-shadow: 0 12px 30px rgba(0,209,255,.28), 0 2px 0 rgba(255,255,255,.5) inset;
  border: 1px solid rgba(255,255,255,.6);
  &:hover:not(:disabled) { filter: brightness(1.05); }
  &:after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 14px;
    box-shadow: 0 0 24px rgba(0,255,200,.55);
    opacity: .0;
    transition: opacity .25s ease;
  }
  &:hover:after { opacity: .7; }
`;

const ButtonGhost = styled(ButtonBase)`
  color: #eaf6ff;
  background: linear-gradient(90deg, rgba(255,255,255,.16), rgba(255,255,255,.08));
  border: 1px solid rgba(255,255,255,.45);
  &:hover { filter: brightness(1.06); }
`;

const InputWrap = styled.div`
  width: 100%;
  max-width: 560px;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: .6rem;
  @media (max-width: 560px) { grid-template-columns: 1fr; }
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1.1rem;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,.6);
  background: rgba(255,255,255,.9);
  color: #0b1020;
  outline: none;
  transition: box-shadow .2s ease, border-color .2s ease;

  &::placeholder { color: #6b7280; }

  &:focus {
    border-color: #00ffa3;
    box-shadow: 0 0 0 6px rgba(0,255,163,.18);
  }
`;

const Helper = styled.div`
  font-size: .85rem;
  color: #d8ecff;
  margin-top: .4rem;
`;

const MapShell = styled.div`
  width: 100%;
  height: 380px;
  border-radius: 18px;
  overflow: hidden;
  position: relative;
  border: 1px solid rgba(255,255,255,.35);
  box-shadow: 0 18px 48px rgba(0,0,0,.25);
  animation: ${floatUp} .4s .06s ease-out both;

  @media (min-width: 950px) { height: 430px; }

  /* animated top bar */
  &:before {
    content: "";
    position: absolute;
    left: 0; right: 0; top: 0; height: 3px;
    background: linear-gradient(90deg,#00e5ff,#00ffa3,#ffd400,#ff56b6,#7b61ff,#00e5ff);
    background-size: 300% 100%;
    animation: ${borderRun} 5s linear infinite;
  }

  /* subtle shimmer overlay */
  &:after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(110deg, rgba(255,255,255,0) 0%, rgba(255,255,255,.15) 20%, rgba(255,255,255,0) 40%);
    background-size: 200% 100%;
    animation: ${shimmer} 7s ease-in-out infinite;
    pointer-events: none;
  }
`;

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  filter: saturate(1.05) contrast(1.02);
`;

const Side = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: .75rem;
`;

const Keyline = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: .6rem;
  padding: 1rem;
  border-radius: 16px;
  color: #06272a;
  background: linear-gradient(180deg, rgba(255,255,255,.95), rgba(240,254,255,.9));
  border: 1px solid rgba(0,255,195,.3);
  box-shadow: 0 10px 26px rgba(0,255,195,.15);
`;

const Tiny = styled.span`
  font-size: .82rem;
  color: #0e3b40;
`;

const FooterRow = styled.div`
  margin-top: .5rem;
  display: flex;
  justify-content: flex-end;
  gap: .6rem;
`;

const ContinueGlow = styled(ButtonPrimary)`
  animation: ${pulse} 2.2s ease-in-out infinite;
`;

/* =================== Component =================== */
function Step1() {
  const navigate = useNavigate();
  const { onboardingData, updateStep } = useOnboarding();
  const [location, setLocation] = useState(onboardingData.step1?.location || '');
  const [search, setSearch] = useState('');

  const handleLocationAccess = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = `${pos.coords.latitude},${pos.coords.longitude}`;
          setLocation(coords);
        },
        () => alert('Unable to access location')
      );
    } else {
      alert('Geolocation not supported');
    }
  };

  const handleSearch = () => {
    setLocation(search);
  };

  const handleNext = () => {
    updateStep('step1', { location });
    navigate('/step-2');
  };

  return (
    <Container>
      <OrbsLayer>
        <i /><i /><i />
      </OrbsLayer>

      <Header>
        <Brand>
          <Logo aria-hidden="true" />
          <BrandName>AdventureHost</BrandName>
          <StepBadge>Step 1 of 5 • Location</StepBadge>
        </Brand>
        <ButtonGhost onClick={handleNext} aria-label="Skip this step">Skip</ButtonGhost>
      </Header>

      <Content>
        <Card>
          {/* LEFT */}
          <CardLeft>
            <Headline>
              Pin your <RainbowText>adventure location</RainbowText>
            </Headline>
            <Sub>
              Allow quick access or search the place — your map preview updates instantly.
            </Sub>

            <ActionsRow>
              <ButtonPrimary onClick={handleLocationAccess}>📍 Allow Location Access</ButtonPrimary>
            </ActionsRow>

            <InputWrap>
              <Input
                type="text"
                placeholder="Search for a location (e.g., Manali, India)"
                value={search}
                onChange={e => setSearch(e.target.value)}
                aria-label="Search location"
              />
              <ButtonGhost onClick={handleSearch} aria-label="Search">Search</ButtonGhost>
            </InputWrap>
            <Helper>
              Tip: Paste <code>latitude,longitude</code> too (e.g., <code>28.6139,77.2090</code>).
            </Helper>

            <MapShell>
              <MapContainer>
                <iframe
                  title="Adventure location map"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(location || 'India')}&z=13&output=embed`}
                  allowFullScreen
                />
              </MapContainer>
            </MapShell>
          </CardLeft>

          {/* RIGHT */}
          <Side>
            <Keyline>
              <div>
                <strong>Selected:</strong><br />
                <Tiny>{location ? location : 'No location selected yet'}</Tiny>
              </div>
              <Tiny>Live Preview →</Tiny>
            </Keyline>

            <div>
              <Tiny>Why this matters</Tiny>
              <p style={{ margin: '.25rem 0 0 0', color: '#0f172a' }}>
                Accurate pins boost discovery, trust, and smoother check-ins for guests.
              </p>
            </div>

            <FooterRow>
              <ButtonGhost onClick={() => setSearch('')} aria-label="Clear search">Clear</ButtonGhost>
              <ContinueGlow onClick={handleNext} disabled={!location} aria-disabled={!location}>
                Continue
              </ContinueGlow>
            </FooterRow>
            {!location && (
              <Tiny>
                Select a location to enable <strong>Continue</strong>.
              </Tiny>
            )}
          </Side>
        </Card>
      </Content>
      <Footer />
    </Container>
  );
}

export default Step1;
