import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useOnboarding } from "../../context/OnboardingContext";
import Footer from "../../components/layout/Footer";

/* ============ Animations ============ */
const floatUp = keyframes`
  from { opacity: 0; transform: translateY(10px) scale(.98); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
`;
const hueShift = keyframes`
  0% { filter: hue-rotate(0deg) }
  100% { filter: hue-rotate(360deg) }
`;
const bgDrift = keyframes`
  0% { transform: translate3d(0,0,0) scale(1); }
  50% { transform: translate3d(-2%, -1%, 0) scale(1.03); }
  100% { transform: translate3d(0,0,0) scale(1); }
`;
const borderRun = keyframes`
  0% { background-position: 0% 50% }
  100% { background-position: 200% 50% }
`;
const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(0,255,200,.25); }
  50% { box-shadow: 0 0 0 10px rgba(0,255,200,0); }
`;

/* ============ Shell ============ */
const Container = styled.div`
  min-height: 100vh;
  font-family: 'Inter', system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  color: #e6f1ff;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &:before, &:after {
    content: "";
    position: fixed;
    inset: -20%;
    z-index: -2;
    background:
      radial-gradient(1200px 600px at 80% -10%, rgba(131,56,236,0.28), transparent 60%),
      radial-gradient(1200px 600px at -20% 110%, rgba(58,134,255,0.28), transparent 60%),
      radial-gradient(900px 500px at 50% 120%, rgba(0,255,163,0.22), transparent 60%),
      linear-gradient(135deg, #0a0f1c 0%, #0b1020 35%, #0f1330 100%);
    animation: ${bgDrift} 18s ease-in-out infinite;
    filter: saturate(1.2);
  }
  &:after {
    mix-blend-mode: screen;
    opacity: .65;
    animation-duration: 24s;
  }
`;

const Orbs = styled.div`
  position: fixed; inset: 0; z-index: -1; pointer-events: none;
  filter: blur(18px); animation: ${hueShift} 28s linear infinite;
  > i { position: absolute; border-radius: 999px; opacity: .5; mix-blend-mode: screen; }
  > i:nth-child(1) { width: 360px; height: 360px; left: -40px; top: 8%; background: radial-gradient(circle at 30% 30%, #ff7bff, transparent 60%); }
  > i:nth-child(2) { width: 280px; height: 280px; right: 8%; top: 22%; background: radial-gradient(circle at 70% 30%, #7bffdc, transparent 60%); }
  > i:nth-child(3) { width: 420px; height: 420px; left: 22%; bottom: -80px; background: radial-gradient(circle at 50% 50%, #7ba6ff, transparent 60%); }
`;

/* Header (consistent with earlier steps) */
const Header = styled.header`
  position: sticky; top: 0; z-index: 10;
  display: flex; justify-content: space-between; align-items: center; gap: 1rem;
  padding: 1rem 1.25rem;
  background: rgba(10,14,28,.55);
  backdrop-filter: blur(14px) saturate(1.15);
  -webkit-backdrop-filter: blur(14px) saturate(1.15);
  border-bottom: 1px solid rgba(255,255,255,.08);
`;
const Brand = styled.div` display: flex; align-items: center; gap: .75rem; `;
const Logo = styled.div`
  width: 38px; height: 38px; border-radius: 12px;
  background: conic-gradient(from 0deg,#00d1ff,#00ffa3,#ffd400,#ff56b6,#7b61ff,#00d1ff);
  animation: ${hueShift} 12s linear infinite;
  box-shadow: 0 8px 26px rgba(0,0,0,.35), 0 0 0 2px rgba(255,255,255,.2) inset;
`;
const BrandName = styled.span`
  font-weight: 900; font-size: 1.1rem; letter-spacing: .4px; color: #f8fbff;
  text-shadow: 0 1px 0 rgba(0,0,0,.35);
`;
const StepBadge = styled.span`
  font-size: .85rem; padding: .35rem .65rem; border-radius: 999px;
  color: #072b25; background: linear-gradient(135deg, rgba(255,255,255,.92), rgba(240,249,255,.82));
  border: 1px solid rgba(255,255,255,.6);
`;

const ButtonBase = styled.button`
  border: 1px solid rgba(255,255,255,.22);
  border-radius: 14px;
  padding: .9rem 1.1rem;
  font-weight: 800; font-size: .95rem; letter-spacing: .2px;
  cursor: pointer;
  transition: transform .15s ease, box-shadow .2s ease, filter .2s ease, background .2s ease, border-color .2s ease;
  display: inline-flex; align-items: center; gap: .6rem;
  &:disabled { opacity: .6; cursor: not-allowed; }
  &:active:not(:disabled) { transform: translateY(1px) scale(.995); }
`;
const ButtonGhost = styled(ButtonBase)`
  color: #eaf6ff;
  background: linear-gradient(90deg, rgba(255,255,255,.12), rgba(255,255,255,.06));
  &:hover { filter: brightness(1.06); }
`;

/* Main layout */
const Content = styled.main`
  flex: 1; display: grid; place-items: center; padding: 2.2rem 1rem 2.6rem;
`;
const Card = styled.div`
  width: 100%; max-width: 1020px;
  border-radius: 22px; padding: 1.25rem;
  background: rgba(14,18,40,.5);
  backdrop-filter: blur(16px) saturate(1.05);
  -webkit-backdrop-filter: blur(16px) saturate(1.05);
  border: 1px solid rgba(255,255,255,.18);
  position: relative; animation: ${floatUp} .35s ease-out both;

  &:before {
    content: ""; position: absolute; inset: -2px; border-radius: 24px; padding: 2px;
    background: linear-gradient(90deg,#00d1ff,#00ffa3,#ffd400,#ff56b6,#7b61ff,#00d1ff);
    background-size: 300% 100%; animation: ${borderRun} 7s linear infinite;
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: destination-out; mask-composite: exclude;
    pointer-events: none;
  }

  @media (min-width: 900px) {
    display: grid; grid-template-columns: 1.05fr .95fr; gap: 1.1rem; padding: 1.4rem;
  }
`;
const Left = styled.div` padding: .75rem; `;
const Right = styled.div` padding: .75rem; display: flex; flex-direction: column; gap: .9rem; `;

const Title = styled.h2`
  margin: 0 0 .5rem 0;
  font-size: clamp(1.4rem, 1.1rem + 1.4vw, 2.2rem);
  line-height: 1.15; font-weight: 900; letter-spacing: -0.02em; color: #f4f7ff;
`;
const Sub = styled.p` margin: 0 0 1rem 0; color: #a8c1ff; opacity: .95; `;
const RainbowBar = styled.div`
  height: 8px; border-radius: 999px;
  background: linear-gradient(90deg,#00e5ff,#00ffa3,#ffd400,#ff56b6,#7b61ff,#00e5ff);
  background-size: 300% 100%; animation: ${borderRun} 6s linear infinite;
  margin: .25rem 0 1rem;
`;

/* Form fields (same functionality) */
const FieldLabel = styled.label`
  display: block; font-size: .9rem; color: #cfe8ff; margin: .25rem 0 .4rem;
`;
const Input = styled.input`
  width: 100%; max-width: 560px; padding: 1rem 1.1rem;
  border-radius: 14px; border: 1px solid rgba(255,255,255,.18);
  background: rgba(255,255,255,.06); color: #e6f1ff; outline: none;
  transition: box-shadow .2s, border-color .2s, background .2s;
  &::placeholder { color: #9fb3d9; }
  &:focus { border-color: #00d1ff; box-shadow: 0 0 0 6px rgba(0,209,255,.16); background: rgba(255,255,255,.1); }
`;
const Select = styled.select`
  width: 100%; max-width: 560px; padding: 1rem 1.1rem;
  border-radius: 14px; border: 1px solid rgba(255,255,255,.18);
  background: rgba(255,255,255,.06); color: #e6f1ff; outline: none; appearance: none;
  transition: box-shadow .2s, border-color .2s, background .2s;
  &:focus { border-color: #00ffa3; box-shadow: 0 0 0 6px rgba(0,255,163,.18); background: rgba(255,255,255,.1); }
  option { color: #0b1020; }
`;
const TextArea = styled.textarea`
  width: 100%; max-width: 720px; min-height: 120px; padding: 1rem 1.1rem;
  border-radius: 14px; border: 1px solid rgba(255,255,255,.18);
  background: rgba(255,255,255,.06); color: #e6f1ff; outline: none; resize: vertical;
  transition: box-shadow .2s, border-color .2s, background .2s;
  &::placeholder { color: #9fb3d9; }
  &:focus { border-color: #00ffa3; box-shadow: 0 0 0 6px rgba(0,255,163,.18); background: rgba(255,255,255,.1); }
`;
const ErrorText = styled.div`
  color: #ff7b7b; font-weight: 600; font-size: .92rem; margin-top: .5rem;
`;

const Row = styled.div` display: flex; gap: .6rem; flex-wrap: wrap; margin-top: 1rem; `;
const ButtonPrimary = styled(ButtonBase)`
  color: #041a17;
  background: linear-gradient(135deg, #00ffa3, #00d1ff);
  box-shadow: 0 12px 30px rgba(0,209,255,.22), 0 2px 0 rgba(255,255,255,.35) inset;
  &:hover { filter: brightness(1.05); }
`;
const ContinueGlow = styled(ButtonPrimary)` animation: ${pulse} 2.2s ease-in-out infinite; `;

/* Tips panel (content-only helper) */
const Tips = styled.div`
  border-radius: 16px; padding: 1rem;
  border: 1px dashed rgba(255,255,255,.16);
  background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.03));
  color: #cfe8ff; font-size: .9rem; animation: ${floatUp} .35s ease-out both;
`;

/* ============ Component ============ */
function Step8() {
  const navigate = useNavigate();
  const { onboardingData, updateStep } = useOnboarding();

  const [price, setPrice] = useState(onboardingData.step8?.price || '');
  const [dates, setDates] = useState(onboardingData.step8?.dates || '');
  const [bookingType, setBookingType] = useState(onboardingData.step8?.bookingType || 'manual');
  const [cancellation, setCancellation] = useState(onboardingData.step8?.cancellation || '');
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!price || !dates || !bookingType || !cancellation) {
      setError('Please fill all fields');
      return;
    }
    setError('');
    updateStep('step8', { price, dates, bookingType, cancellation });
    navigate('/step-9');
  };

  return (
    <Container>
      <Orbs><i /><i /><i /></Orbs>

      <Header>
        <Brand>
          <Logo aria-hidden="true" />
          <BrandName>AdventureHost</BrandName>
          <StepBadge>Step 8 of 18 • Booking</StepBadge>
        </Brand>
        <ButtonGhost onClick={handleNext} aria-label="Skip this step">Skip</ButtonGhost>
      </Header>

      <Content>
        <Card>
          {/* LEFT: Form */}
          <Left>
            <Title>Final Details & Booking Setup</Title>
            <Sub>Add price, available dates/timings, booking type, and cancellation policy.</Sub>
            <RainbowBar />

            <div>
              <FieldLabel htmlFor="price">Price per person or group</FieldLabel>
              <Input
                id="price"
                type="text"
                placeholder="e.g., $100/person or $600/group"
                value={price}
                onChange={e => setPrice(e.target.value)}
              />
            </div>

            <div style={{ marginTop: '0.8rem' }}>
              <FieldLabel htmlFor="dates">Available dates/timings</FieldLabel>
              <Input
                id="dates"
                type="text"
                placeholder="e.g., 1–10 June, weekends only, 6am & 4pm slots"
                value={dates}
                onChange={e => setDates(e.target.value)}
              />
            </div>

            <div style={{ marginTop: '0.8rem' }}>
              <FieldLabel htmlFor="btype">Booking type</FieldLabel>
              <Select
                id="btype"
                value={bookingType}
                onChange={e => setBookingType(e.target.value)}
              >
                <option value="manual">Manual Confirmation</option>
                <option value="instant">Instant Booking</option>
              </Select>
            </div>

            <div style={{ marginTop: '0.8rem' }}>
              <FieldLabel htmlFor="cancel">Cancellation policy</FieldLabel>
              <TextArea
                id="cancel"
                placeholder="e.g., Free cancellation up to 7 days before; 50% refund within 3 days."
                value={cancellation}
                onChange={e => setCancellation(e.target.value)}
                rows={6}
              />
            </div>

            {error && <ErrorText role="alert">{error}</ErrorText>}

            <Row>
              <ButtonGhost onClick={() => { setPrice(''); setDates(''); setBookingType('manual'); setCancellation(''); setError(''); }}>
                Clear
              </ButtonGhost>
              <ContinueGlow onClick={handleNext}>Continue</ContinueGlow>
            </Row>
          </Left>

          {/* RIGHT: Booking tips (no logic change) */}
          <Right>
            <Sub>Booking Tips</Sub>
            <Tips>
              <ul style={{ margin: 0, paddingLeft: '1.1rem', lineHeight: 1.55 }}>
                <li><strong>Transparent pricing:</strong> Mention what’s included (gear, permits, meals).</li>
                <li><strong>Time windows:</strong> Multiple slots (morning/evening) boost conversions.</li>
                <li><strong>Instant vs Manual:</strong> Instant = higher bookings; Manual = more control.</li>
                <li><strong>Fair policy:</strong> Clear cancellation rules reduce disputes.</li>
              </ul>
            </Tips>

            <Sub style={{ marginTop: '1rem' }}>Quick Preview</Sub>
            <Tips as="div">
              <div style={{ fontWeight: 800, color: '#e6f1ff' }}>
                {price || 'Price not set'}
              </div>
              <div style={{ marginTop: '.35rem', color: '#cfe8ff' }}>
                Dates: <span style={{ color: dates ? '#00ffa3' : '#9fb3d9' }}>{dates || '—'}</span>
              </div>
              <div style={{ marginTop: '.35rem', color: '#cfe8ff' }}>
                Booking: <span style={{ color: '#7bffdc' }}>
                  {bookingType === 'instant' ? 'Instant Booking' : 'Manual Confirmation'}
                </span>
              </div>
              <div style={{ marginTop: '.6rem', color: '#cfe8ff' }}>
                {cancellation || 'Cancellation policy will appear here…'}
              </div>
            </Tips>
          </Right>
        </Card>
      </Content>

      <Footer />
    </Container>
  );
}

export default Step8;
