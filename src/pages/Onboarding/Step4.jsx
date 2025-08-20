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

/* ============ Layout ============ */
const Container = styled.div`
  min-height: 100vh;
  font-family: 'Inter', system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  color: #e6f1ff;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  /* Animated dark, colorful background */
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
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  filter: blur(18px);
  animation: ${hueShift} 28s linear infinite;
  > i {
    position: absolute;
    border-radius: 999px;
    opacity: 0.5;
    mix-blend-mode: screen;
  }
  > i:nth-child(1) { width: 360px; height: 360px; left: -40px; top: 8%; background: radial-gradient(circle at 30% 30%, #ff7bff, transparent 60%); }
  > i:nth-child(2) { width: 280px; height: 280px; right: 8%; top: 22%; background: radial-gradient(circle at 70% 30%, #7bffdc, transparent 60%); }
  > i:nth-child(3) { width: 420px; height: 420px; left: 22%; bottom: -80px; background: radial-gradient(circle at 50% 50%, #7ba6ff, transparent 60%); }
`;

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: rgba(10, 14, 28, 0.55);
  backdrop-filter: blur(14px) saturate(1.15);
  -webkit-backdrop-filter: blur(14px) saturate(1.15);
  border-bottom: 1px solid rgba(255,255,255,0.08);
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
  animation: ${hueShift} 12s linear infinite;
  box-shadow: 0 8px 26px rgba(0,0,0,.35), 0 0 0 2px rgba(255,255,255,.2) inset;
`;

const BrandName = styled.span`
  font-weight: 900;
  font-size: 1.1rem;
  letter-spacing: .4px;
  color: #f8fbff;
  text-shadow: 0 1px 0 rgba(0,0,0,.35);
`;

const StepBadge = styled.span`
  font-size: .85rem;
  padding: .35rem .65rem;
  border-radius: 999px;
  color: #072b25;
  background: linear-gradient(135deg, rgba(255,255,255,.92), rgba(240,249,255,.82));
  border: 1px solid rgba(255,255,255,.6);
`;

const Content = styled.main`
  flex: 1;
  display: grid;
  place-items: center;
  padding: 2.2rem 1rem 2.6rem;
`;

const Card = styled.div`
  width: 100%;
  max-width: 1020px;
  border-radius: 22px;
  padding: 1.25rem;
  background: rgba(14, 18, 40, 0.5);
  backdrop-filter: blur(16px) saturate(1.05);
  -webkit-backdrop-filter: blur(16px) saturate(1.05);
  border: 1px solid rgba(255,255,255,0.18);
  position: relative;
  animation: ${floatUp} .35s ease-out both;

  &:before {
    content: "";
    position: absolute;
    inset: -2px;
    border-radius: 24px;
    padding: 2px;
    background: linear-gradient(90deg, #00d1ff, #00ffa3, #ffd400, #ff56b6, #7b61ff, #00d1ff);
    background-size: 300% 100%;
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
    animation: ${borderRun} 7s linear infinite;
    pointer-events: none;
  }

  @media (min-width: 900px) {
    display: grid;
    grid-template-columns: 1.1fr .9fr;
    gap: 1.1rem;
    padding: 1.4rem;
  }
`;

const Left = styled.div`
  padding: .75rem;
`;

const Right = styled.div`
  padding: .75rem;
  display: flex;
  flex-direction: column;
  gap: .9rem;
`;

const Title = styled.h2`
  margin: 0 0 .5rem 0;
  font-size: clamp(1.4rem, 1.1rem + 1.4vw, 2.2rem);
  line-height: 1.15;
  font-weight: 900;
  letter-spacing: -0.02em;
  color: #f4f7ff;
`;

const Sub = styled.p`
  margin: 0 0 1rem 0;
  color: #a8c1ff;
  opacity: .95;
`;

const RainbowBar = styled.div`
  height: 8px;
  border-radius: 999px;
  background: linear-gradient(90deg,#00e5ff,#00ffa3,#ffd400,#ff56b6,#7b61ff,#00e5ff);
  background-size: 300% 100%;
  animation: ${borderRun} 6s linear infinite;
  margin: .25rem 0 1rem;
`;

const FormGrid = styled.div`
  display: grid;
  gap: 1rem;
  width: 100%;
  max-width: 560px;
`;

const FieldLabel = styled.label`
  display: block;
  font-size: .9rem;
  color: #cfe8ff;
  margin: .25rem 0 .4rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1.1rem;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,.18);
  background: rgba(255,255,255,.06);
  color: #e6f1ff;
  outline: none;
  transition: box-shadow .2s ease, border-color .2s ease, background .2s ease;

  &::placeholder { color: #9fb3d9; }

  &:focus {
    border-color: #00d1ff;
    box-shadow: 0 0 0 6px rgba(0,209,255,.16);
    background: rgba(255,255,255,.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 1rem 1.1rem;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,.18);
  background: rgba(255,255,255,.06);
  color: #e6f1ff;
  outline: none;
  transition: box-shadow .2s ease, border-color .2s ease, background .2s ease;
  appearance: none;

  &:focus {
    border-color: #00ffa3;
    box-shadow: 0 0 0 6px rgba(0,255,163,.18);
    background: rgba(255,255,255,.1);
  }

  option { color: #0b1020; }
`;

const ErrorText = styled.div`
  color: #ff7b7b;
  font-weight: 600;
  font-size: .92rem;
`;

const Row = styled.div`
  display: flex;
  gap: .6rem;
  flex-wrap: wrap;
  margin-top: 1rem;
`;

const ButtonBase = styled.button`
  border: 1px solid rgba(255,255,255,.22);
  border-radius: 14px;
  padding: .95rem 1.2rem;
  font-weight: 800;
  font-size: .95rem;
  letter-spacing: .2px;
  cursor: pointer;
  transition: transform .15s ease, box-shadow .2s ease, filter .2s ease, background .2s ease, border-color .2s ease;
  display: inline-flex;
  align-items: center;
  gap: .6rem;
  position: relative;
  will-change: transform;

  &:disabled { opacity: .6; cursor: not-allowed; }
  &:active:not(:disabled) { transform: translateY(1px) scale(.995); }
`;

const ButtonPrimary = styled(ButtonBase)`
  color: #041a17;
  background: linear-gradient(135deg, #00ffa3, #00d1ff);
  box-shadow: 0 12px 30px rgba(0,209,255,.22), 0 2px 0 rgba(255,255,255,.35) inset;
  &:hover:not(:disabled) { filter: brightness(1.05); }
`;

const ButtonGhost = styled(ButtonBase)`
  color: #eaf6ff;
  background: linear-gradient(90deg, rgba(255,255,255,.12), rgba(255,255,255,.06));
  &:hover { filter: brightness(1.06); }
`;

const ContinueGlow = styled(ButtonPrimary)`
  animation: ${pulse} 2.2s ease-in-out infinite;
`;

/* Right: live summary card */
const SummaryCard = styled.div`
  border-radius: 16px;
  padding: 1rem;
  border: 1px solid rgba(255,255,255,.16);
  background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.03));
  animation: ${floatUp} .35s ease-out both;
`;

/* ============ Component ============ */
function Step4() {
  const navigate = useNavigate();
  const { onboardingData, updateStep } = useOnboarding();
  const [unique, setUnique] = useState(onboardingData.step4?.unique || '');
  const [role, setRole] = useState(onboardingData.step4?.role || '');
  const [duration, setDuration] = useState(onboardingData.step4?.duration || '');
  const [groupSize, setGroupSize] = useState(onboardingData.step4?.groupSize || '');
  const [pricing, setPricing] = useState(onboardingData.step4?.pricing || '');
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!unique || !role || !duration || !groupSize || !pricing) {
      setError('Please fill all fields');
      return;
    }
    setError('');
    updateStep('step4', { unique, role, duration, groupSize, pricing });
    navigate('/step-5');
  };

  return (
    <Container>
      <Orbs><i /><i /><i /></Orbs>

      <Header>
        <Brand>
          <Logo aria-hidden="true" />
          <BrandName>AdventureHost</BrandName>
          <StepBadge>Step 4 of 5 • Details</StepBadge>
        </Brand>
        <ButtonGhost onClick={handleNext} aria-label="Skip this step">Skip</ButtonGhost>
      </Header>

      <Content>
        <Card>
          {/* LEFT: Form */}
          <Left>
            <Title>Describe Your Adventure & Business</Title>
            <Sub>
              What makes it unique? Your role, duration, group size, and pricing range.
            </Sub>
            <RainbowBar />

            <FormGrid>
              <div>
                <FieldLabel htmlFor="unique">What makes your adventure unique?</FieldLabel>
                <Input
                  id="unique"
                  type="text"
                  placeholder="e.g., Sunrise summit with glacier traverse"
                  value={unique}
                  onChange={e => setUnique(e.target.value)}
                />
              </div>

              <div>
                <FieldLabel htmlFor="role">Your role</FieldLabel>
                <Select
                  id="role"
                  value={role}
                  onChange={e => setRole(e.target.value)}
                >
                  <option value="">Select your role</option>
                  <option value="Guide">Guide</option>
                  <option value="Organizer">Organizer</option>
                  <option value="Company">Company</option>
                </Select>
              </div>

              <div>
                <FieldLabel htmlFor="duration">Adventure duration</FieldLabel>
                <Input
                  id="duration"
                  type="text"
                  placeholder="e.g., 3 days, 5 hours"
                  value={duration}
                  onChange={e => setDuration(e.target.value)}
                />
              </div>

              <div>
                <FieldLabel htmlFor="groupSize">Group size</FieldLabel>
                <Input
                  id="groupSize"
                  type="number"
                  placeholder="e.g., 10"
                  value={groupSize}
                  onChange={e => setGroupSize(e.target.value)}
                />
              </div>

              <div>
                <FieldLabel htmlFor="pricing">Pricing range</FieldLabel>
                <Input
                  id="pricing"
                  type="text"
                  placeholder="e.g., $100–$500"
                  value={pricing}
                  onChange={e => setPricing(e.target.value)}
                />
              </div>

              {error && <ErrorText role="alert">{error}</ErrorText>}

              <Row>
                <ButtonGhost onClick={() => {
                  setUnique('');
                  setRole('');
                  setDuration('');
                  setGroupSize('');
                  setPricing('');
                  setError('');
                }}>
                  Clear
                </ButtonGhost>
                <ContinueGlow onClick={handleNext}>
                  Continue
                </ContinueGlow>
              </Row>
            </FormGrid>
          </Left>

          {/* RIGHT: Live Summary */}
          <Right>
            <Sub>Live Summary</Sub>
            <SummaryCard>
              <div style={{ fontWeight: 800, color: '#e6f1ff' }}>
                Unique: <span style={{ color: unique ? '#7bffdc' : '#9fb3d9' }}>
                  {unique || '—'}
                </span>
              </div>
              <div style={{ marginTop: '.35rem', color: '#cfe8ff' }}>
                Role: <span style={{ color: role ? '#00ffa3' : '#9fb3d9' }}>
                  {role || '—'}
                </span>
              </div>
              <div style={{ marginTop: '.35rem', color: '#cfe8ff' }}>
                Duration: <span style={{ color: duration ? '#7bffdc' : '#9fb3d9' }}>
                  {duration || '—'}
                </span>
              </div>
              <div style={{ marginTop: '.35rem', color: '#cfe8ff' }}>
                Group size: <span style={{ color: groupSize ? '#ffd400' : '#9fb3d9' }}>
                  {groupSize || '—'}
                </span>
              </div>
              <div style={{ marginTop: '.35rem', color: '#cfe8ff' }}>
                Pricing: <span style={{ color: pricing ? '#ff56b6' : '#9fb3d9' }}>
                  {pricing || '—'}
                </span>
              </div>
            </SummaryCard>
          </Right>
        </Card>
      </Content>

      {/* Footer included */}
      <Footer />
    </Container>
  );
}

export default Step4;
