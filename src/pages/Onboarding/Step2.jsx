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

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
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
  max-width: 960px;
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
  margin: 0 0 1.2rem 0;
  color: #a8c1ff;
  opacity: .95;
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
    border-color: #00ffa3;
    box-shadow: 0 0 0 6px rgba(0,255,163,.18);
    background: rgba(255,255,255,.1);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem 1.1rem;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,.18);
  background: rgba(255,255,255,.06);
  color: #e6f1ff;
  outline: none;
  resize: none;
  transition: box-shadow .2s ease, border-color .2s ease, background .2s ease;

  &::placeholder { color: #9fb3d9; }

  &:focus {
    border-color: #00d1ff;
    box-shadow: 0 0 0 6px rgba(0,209,255,.16);
    background: rgba(255,255,255,.1);
  }
`;

const Counter = styled.div`
  font-size: .85rem;
  color: ${p => (p.$warn ? '#ff7b7b' : '#9fb3d9')};
  margin: .4rem 0 0;
`;

const ErrorText = styled.div`
  color: #ff7b7b;
  font-weight: 600;
  font-size: .92rem;
  margin-top: .25rem;
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
  animation: ${pulse} 2.4s ease-in-out infinite;
`;

const Tips = styled.div`
  margin-top: .25rem;
  padding: .9rem 1rem;
  border-radius: 14px;
  border: 1px dashed rgba(255,255,255,.16);
  background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.03));
  color: #cfe8ff;
  font-size: .9rem;
`;

/* NEW: Replace inline animation styles with styled components */
const PreviewCard = styled.div`
  border-radius: 16px;
  padding: 1rem;
  border: 1px solid rgba(255,255,255,.16);
  background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.03));
  animation: ${floatUp} .35s ease-out both;
`;

const PreviewBar = styled.div`
  height: 10px;
  border-radius: 999px;
  background: linear-gradient(90deg,#00e5ff,#00ffa3,#ffd400,#ff56b6,#7b61ff,#00e5ff);
  background-size: 300% 100%;
  animation: ${borderRun} 6s linear infinite;
`;

function Step2() {
  const navigate = useNavigate();
  const { onboardingData, updateStep } = useOnboarding();
  const [title, setTitle] = useState(onboardingData.step2?.title || '');
  const [description, setDescription] = useState(onboardingData.step2?.description || '');
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    if (description.length > 200) {
      setError('Description must be 200 characters or less');
      return;
    }
    setError('');
    updateStep('step2', { title, description });
    navigate('/step-3');
  };

  return (
    <Container>
      <Orbs><i /><i /><i /></Orbs>

      <Header>
        <Brand>
          <Logo aria-hidden="true" />
          <BrandName>AdventureHost</BrandName>
          <StepBadge>Step 2 of 5 • Basics</StepBadge>
        </Brand>
        <ButtonGhost onClick={handleNext} aria-label="Skip this step">Skip</ButtonGhost>
      </Header>

      <Content>
        <Card>
          <Left>
            <Title>Basic Adventure Info</Title>
            <Sub>Craft a catchy title and a crisp, compelling description (max 200 chars).</Sub>

            <div>
              <FieldLabel htmlFor="adv-title">Adventure Title</FieldLabel>
              <Input
                id="adv-title"
                type="text"
                placeholder="e.g., Moonlit Trek to Triund"
                value={title}
                onChange={e => setTitle(e.target.value)}
                aria-invalid={!!error && !title.trim()}
                aria-describedby="title-help"
              />
              <Counter id="title-help">{title.trim().length || 0} characters</Counter>
            </div>

            <div style={{ marginTop: '1rem' }}>
              <FieldLabel htmlFor="adv-desc">Short Description</FieldLabel>
              <TextArea
                id="adv-desc"
                placeholder="In 200 characters, hook your guests with what makes this adventure unforgettable."
                value={description}
                onChange={e => setDescription(e.target.value)}
                maxLength={200}
                rows={5}
                aria-invalid={description.length > 200}
                aria-describedby="desc-count"
              />
              <Counter id="desc-count" $warn={description.length > 200}>
                {description.length}/200 characters
              </Counter>
            </div>

            {error && <ErrorText role="alert">{error}</ErrorText>}

            <Row>
              <ButtonGhost onClick={() => { setTitle(''); setDescription(''); }} aria-label="Clear fields">
                Clear
              </ButtonGhost>
              <ContinueGlow onClick={handleNext} aria-disabled={!title.trim()}>
                Continue
              </ContinueGlow>
            </Row>
          </Left>

          <Right>
            <Tips>
              <strong style={{ color: '#e6f1ff' }}>Quick tips:</strong>
              <ul style={{ margin: '.5rem 0 0 1rem', lineHeight: 1.5 }}>
                <li>Lead with the unique hook (e.g., “Sunrise above clouds”).</li>
                <li>Mention difficulty, duration, or highlight in a phrase.</li>
                <li>Keep it punchy—your title + first line = conversion power.</li>
              </ul>
            </Tips>

            <div>
              <FieldLabel>Preview Example</FieldLabel>
              <PreviewCard>
                <PreviewBar />
                <div style={{ marginTop: '.75rem', color: '#cfe8ff' }}>
                  <div style={{ fontWeight: 800, fontSize: '1rem', color: '#e6f1ff' }}>
                    {title || 'Your adventure title appears here'}
                  </div>
                  <div style={{ fontSize: '.92rem', marginTop: '.25rem' }}>
                    {description || 'Write a short, exciting description that sparks curiosity and sets expectations.'}
                  </div>
                </div>
              </PreviewCard>
            </div>
          </Right>
        </Card>
      </Content>

      <Footer />
    </Container>
  );
}

export default Step2;
