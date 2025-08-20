import React, { useState, useEffect } from 'react';
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
  50% { box-shadow: 0 0 0 12px rgba(0,255,200,0); }
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

/* Header */
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
const ButtonBase = styled.button`
  border: 1px solid rgba(255,255,255,.22);
  border-radius: 14px;
  padding: .9rem 1.1rem;
  font-weight: 800; font-size: .95rem; letter-spacing: .2px;
  cursor: pointer;
  transition: transform .15s, box-shadow .2s, filter .2s, background .2s, border-color .2s;
  display: inline-flex; align-items: center; gap: .6rem;
  &:disabled { opacity: .6; cursor: not-allowed; }
  &:active:not(:disabled) { transform: translateY(1px) scale(.995); }
`;
const ButtonGhost = styled(ButtonBase)`
  color: #eaf6ff;
  background: linear-gradient(90deg, rgba(255,255,255,.12), rgba(255,255,255,.06));
  &:hover { filter: brightness(1.06); }
`;
const ButtonPrimary = styled(ButtonBase)`
  color: #041a17;
  background: linear-gradient(135deg, #00ffa3, #00d1ff);
  box-shadow: 0 12px 30px rgba(0,209,255,.22), 0 2px 0 rgba(255,255,255,.35) inset;
  &:hover { filter: brightness(1.05); }
`;
const PublishGlow = styled(ButtonPrimary)` animation: ${pulse} 2.2s ease-in-out infinite; `;

/* Main */
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
    -webkit-mask-composite: destination-out; mask-composite: exclude; pointer-events: none;
  }

  @media (min-width: 1000px) {
    display: grid; grid-template-columns: 1.05fr .95fr; gap: 1.1rem; padding: 1.4rem;
  }
`;
const Left = styled.div` padding: .75rem; `;
const Right = styled.div` padding: .75rem; display: flex; flex-direction: column; gap: 1rem; `;

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

/* Adventure preview parts */
const AdventureCard = styled.div`
  border: 1px solid rgba(255,255,255,.16);
  border-radius: 18px;
  background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.03));
  padding: 1.1rem;
`;
const Line = styled.div` margin-bottom: .7rem; color: #cfe8ff; `;
const Label = styled.span` color: #9fb3d9; `;
const Value = styled.span` color: #e6f1ff; `;
const EditLink = styled.button`
  margin-left: .5rem; color: #7bffdc; text-decoration: underline; cursor: pointer; background: none; border: none; padding: 0;
  &:hover { color: #00ffa3; }
`;

/* Tips/guide */
const Guide = styled.div`
  border-radius: 16px; padding: 1rem;
  border: 1px dashed rgba(255,255,255,.16);
  background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.03));
  color: #cfe8ff; font-size: .92rem;
`;

/* Bottom actions */
const Actions = styled.div`
  display: flex; gap: .6rem; flex-wrap: wrap; margin-top: 1rem;
`;

function Step9() {
  const navigate = useNavigate();
  const { onboardingData } = useOnboarding();
  const [published, setPublished] = useState(false);

  const handlePublish = () => {
    const newAdventure = {
      ...onboardingData,
      status: 'pending',
      id: Date.now(),
    };
    const existing = JSON.parse(localStorage.getItem('pendingAdventures') || '[]');
    localStorage.setItem('pendingAdventures', JSON.stringify([...existing, newAdventure]));
    setPublished(true);
  };

  useEffect(() => {
    if (published) navigate('/dashboard');
  }, [published, navigate]);

  return (
    <Container>
      <Orbs><i /><i /><i /></Orbs>

      <Header>
        <Brand>
          <Logo aria-hidden="true" />
          <BrandName>AdventureHost</BrandName>
        </Brand>
        <div style={{ display: 'flex', gap: '.6rem' }}>
          <ButtonGhost onClick={() => navigate(-1)}>Back</ButtonGhost>
        </div>
      </Header>

      <Content>
        <Card>
          <Left>
            <Title>Preview & Launch</Title>
            <Sub>Review your Adventure Card. Make final edits or publish to go live.</Sub>
            <RainbowBar />

            <AdventureCard>
              <h3 style={{ margin: 0, color: '#e6f1ff', fontSize: '1.2rem', fontWeight: 900 }}>
                {onboardingData.step2?.title || 'Untitled Adventure'}
              </h3>
              <Line><Label>Location:</Label> <Value>{onboardingData.step1?.location || '—'}</Value></Line>
              <Line><Label>About:</Label> <Value>{onboardingData.step2?.description || '—'}</Value></Line>

              <Line>
                <Label>Category:</Label> <Value>
                  {onboardingData.step3?.category || '—'}
                  {onboardingData.step3?.subType ? ` — ${onboardingData.step3?.subType}` : ''}
                </Value>
                <EditLink onClick={() => navigate('/step-3')}>Edit</EditLink>
              </Line>

              <Line>
                <Label>Unique:</Label> <Value>{onboardingData.step4?.unique || '—'}</Value>
                <EditLink onClick={() => navigate('/step-4')}>Edit</EditLink>
              </Line>
              <Line>
                <Label>Role:</Label> <Value>{onboardingData.step4?.role || '—'}</Value>
                <EditLink onClick={() => navigate('/step-4')}>Edit</EditLink>
              </Line>
              <Line>
                <Label>Duration:</Label> <Value>{onboardingData.step4?.duration || '—'}</Value>
                <EditLink onClick={() => navigate('/step-4')}>Edit</EditLink>
              </Line>
              <Line>
                <Label>Group Size:</Label> <Value>{onboardingData.step4?.groupSize || '—'}</Value>
                <EditLink onClick={() => navigate('/step-4')}>Edit</EditLink>
              </Line>
              <Line>
                <Label>Pricing:</Label> <Value>{onboardingData.step4?.pricing || '—'}</Value>
                <EditLink onClick={() => navigate('/step-4')}>Edit</EditLink>
              </Line>

              <Line>
                <Label>Tags:</Label> <Value>{onboardingData.step6?.tags || '—'}</Value>
                <EditLink onClick={() => navigate('/step-6')}>Edit</EditLink>
              </Line>
              <Line>
                <Label>Tone:</Label> <Value>{onboardingData.step6?.tone || '—'}</Value>
                <EditLink onClick={() => navigate('/step-6')}>Edit</EditLink>
              </Line>
              <Line>
                <Label>Language:</Label> <Value>{onboardingData.step6?.language || '—'}</Value>
                <EditLink onClick={() => navigate('/step-6')}>Edit</EditLink>
              </Line>
              <Line>
                <Label>Story:</Label> <Value>{onboardingData.step6?.story || '—'}</Value>
                <EditLink onClick={() => navigate('/step-6')}>Edit</EditLink>
              </Line>

              <Line>
                <Label>Price:</Label> <Value>{onboardingData.step8?.price || '—'}</Value>
                <EditLink onClick={() => navigate('/step-8')}>Edit</EditLink>
              </Line>
              <Line>
                <Label>Dates:</Label> <Value>{onboardingData.step8?.dates || '—'}</Value>
                <EditLink onClick={() => navigate('/step-8')}>Edit</EditLink>
              </Line>
              <Line>
                <Label>Booking Type:</Label> <Value>{onboardingData.step8?.bookingType || '—'}</Value>
                <EditLink onClick={() => navigate('/step-8')}>Edit</EditLink>
              </Line>
              <Line>
                <Label>Cancellation:</Label> <Value>{onboardingData.step8?.cancellation || '—'}</Value>
                <EditLink onClick={() => navigate('/step-8')}>Edit</EditLink>
              </Line>
            </AdventureCard>

            <Actions>
              <PublishGlow onClick={handlePublish}>Publish & Go Live!</PublishGlow>
            </Actions>
          </Left>

          <Right>
            <Sub>Launch Checklist</Sub>
            <Guide>
              <ul style={{ margin: 0, paddingLeft: '1.1rem', lineHeight: 1.55 }}>
                <li><strong>Accuracy:</strong> Title, pricing, dates, map pin all verified.</li>
                <li><strong>Photos:</strong> Hero + supporting images look sharp on mobile.</li>
                <li><strong>Safety:</strong> Mention certifications and emergency plan in the description.</li>
                <li><strong>Response:</strong> Turn on notifications for faster booking replies.</li>
              </ul>
            </Guide>
          </Right>
        </Card>
      </Content>

      <Footer />
    </Container>
  );
}

export default Step9;
