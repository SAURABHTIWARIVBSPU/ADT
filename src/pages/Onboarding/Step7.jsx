import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
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

/* ============ Layout Shell ============ */
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
    position: absolute; border-radius: 999px; opacity: 0.5; mix-blend-mode: screen;
  }
  > i:nth-child(1) { width: 360px; height: 360px; left: -40px; top: 8%; background: radial-gradient(circle at 30% 30%, #ff7bff, transparent 60%); }
  > i:nth-child(2) { width: 280px; height: 280px; right: 8%; top: 22%; background: radial-gradient(circle at 70% 30%, #7bffdc, transparent 60%); }
  > i:nth-child(3) { width: 420px; height: 420px; left: 22%; bottom: -80px; background: radial-gradient(circle at 50% 50%, #7ba6ff, transparent 60%); }
`;

/* ============ Header (same style family as earlier steps) ============ */
const Header = styled.header`
  position: sticky; top: 0; z-index: 10;
  display: flex; justify-content: space-between; align-items: center; gap: 1rem;
  padding: 1rem 1.25rem;
  background: rgba(10, 14, 28, 0.55);
  backdrop-filter: blur(14px) saturate(1.15);
  -webkit-backdrop-filter: blur(14px) saturate(1.15);
  border-bottom: 1px solid rgba(255,255,255,0.08);
`;
const Brand = styled.div`
  display: flex; align-items: center; gap: .75rem;
`;
const Logo = styled.div`
  width: 38px; height: 38px; border-radius: 12px;
  background: conic-gradient(from 0deg, #00d1ff, #00ffa3, #ffd400, #ff56b6, #7b61ff, #00d1ff);
  animation: ${hueShift} 12s linear infinite;
  box-shadow: 0 8px 26px rgba(0,0,0,.35), 0 0 0 2px rgba(255,255,255,.2) inset;
`;
const BrandName = styled.span`
  font-weight: 900; font-size: 1.1rem; letter-spacing: .4px; color: #f8fbff;
  text-shadow: 0 1px 0 rgba(0,0,0,.35);
`;
const StepBadge = styled.span`
  font-size: .85rem; padding: .35rem .65rem; border-radius: 999px;
  color: #072b25;
  background: linear-gradient(135deg, rgba(255,255,255,.92), rgba(240,249,255,.82));
  border: 1px solid rgba(255,255,255,.6);
`;

const ButtonBase = styled.button`
  border: 1px solid rgba(255,255,255,.22);
  border-radius: 14px;
  padding: .9rem 1.1rem;
  font-weight: 800; font-size: .95rem; letter-spacing: .2px;
  cursor: pointer;
  transition: transform .15s ease, box-shadow .2s ease, filter .2s ease, background .2s ease, border-color .2s ease;
  display: inline-flex; align-items: center; gap: .6rem; position: relative;
  &:disabled { opacity: .6; cursor: not-allowed; }
  &:active:not(:disabled) { transform: translateY(1px) scale(.995); }
`;
const ButtonGhost = styled(ButtonBase)`
  color: #eaf6ff;
  background: linear-gradient(90deg, rgba(255,255,255,.12), rgba(255,255,255,.06));
  &:hover { filter: brightness(1.06); }
`;

/* ============ Main ============ */
const Content = styled.main`
  flex: 1; display: grid; place-items: center; padding: 2.2rem 1rem 2.6rem;
`;
const Card = styled.div`
  width: 100%; max-width: 1200px;
  border-radius: 22px; padding: 1.25rem;
  background: rgba(14, 18, 40, 0.5);
  backdrop-filter: blur(16px) saturate(1.05);
  -webkit-backdrop-filter: blur(16px) saturate(1.05);
  border: 1px solid rgba(255,255,255,0.18);
  position: relative; animation: ${floatUp} .35s ease-out both;

  &:before {
    content: ""; position: absolute; inset: -2px; border-radius: 24px; padding: 2px;
    background: linear-gradient(90deg,#00d1ff,#00ffa3,#ffd400,#ff56b6,#7b61ff,#00d1ff);
    background-size: 300% 100%; animation: ${borderRun} 7s linear infinite;
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: destination-out; mask-composite: exclude; pointer-events: none;
  }

  @media (min-width: 1000px) {
    display: grid; grid-template-columns: 1.1fr .9fr; gap: 1.25rem; padding: 1.4rem;
  }
`;

const Left = styled.div` padding: .75rem; `;
const Right = styled.div` padding: .75rem; display: flex; flex-direction: column; gap: 1rem; `;

const StepIndicator = styled.div`
  font-size: .85rem; color: #a8c1ff; letter-spacing: .1em; text-transform: uppercase; margin-bottom: .5rem;
`;
const Title = styled.h1`
  margin: 0 0 .5rem 0;
  font-size: clamp(1.6rem, 1.2rem + 1.6vw, 2.6rem);
  line-height: 1.15; font-weight: 900; letter-spacing: -0.02em; color: #f4f7ff;
`;
const Sub = styled.p`
  margin: 0 0 1rem 0; color: #cfe8ff; opacity: .95;
`;
const RainbowBar = styled.div`
  height: 8px; border-radius: 999px;
  background: linear-gradient(90deg,#00e5ff,#00ffa3,#ffd400,#ff56b6,#7b61ff,#00e5ff);
  background-size: 300% 100%; animation: ${borderRun} 6s linear infinite;
  margin: .25rem 0 1.2rem;
`;

/* Progress Ring */
const ProgressWrap = styled.div`
  position: relative; width: 220px; height: 220px; margin: 1rem 0;
`;
const Circle = styled.div`
  position: absolute; inset: 0; border-radius: 50%;
  background: conic-gradient(#00ffa3 ${p => p.$progress}%, rgba(255,255,255,.12) ${p => p.$progress}% 100%);
  display: grid; place-items: center;
  &:before {
    content: ""; position: absolute; width: 84%; height: 84%; border-radius: 50%;
    background: rgba(14,18,40,.75); border: 1px solid rgba(255,255,255,.18);
    box-shadow: 0 4px 12px rgba(0,0,0,.25);
  }
`;
const ProgressText = styled.div`
  position: relative; z-index: 1; font-size: 2rem; font-weight: 900;
  background: linear-gradient(90deg,#00e5ff,#00ffa3,#ffd400);
  background-size: 300% 100%; -webkit-background-clip: text; background-clip: text; color: transparent;
  animation: ${borderRun} 8s linear infinite;
`;

/* Checklist */
const Checklist = styled.div` display: grid; gap: .8rem; margin-top: 1rem; `;
const CheckItem = styled.div`
  display: flex; gap: .75rem; align-items: center;
  padding: .9rem 1rem; border-radius: 14px;
  border: 1px solid rgba(255,255,255,.16);
  background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.03));
  transition: transform .2s ease; will-change: transform;
  &:hover { transform: translateY(-2px); }
  svg { flex-shrink: 0; color: ${p => (p.$ok ? '#00ffa3' : '#ffd400')}; }
`;

/* Guide card */
const Guide = styled.div`
  border-radius: 16px; padding: 1rem;
  border: 1px dashed rgba(255,255,255,.16);
  background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.03));
  color: #cfe8ff; font-size: .92rem; animation: ${floatUp} .35s ease-out both;
`;

/* Footer Nav */
const NavBar = styled.footer`
  display: flex; justify-content: space-between; align-items: center;
  padding: 1.25rem; border-top: 1px solid rgba(255,255,255,.12);
  background: rgba(10,14,28,.55); backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  @media (max-width: 768px) { flex-direction: column; gap: .75rem; }
`;
const NavButton = styled(ButtonBase)`
  border-radius: 999px; padding: 1rem 2rem;
`;
const NavNext = styled(NavButton)`
  color: #041a17;
  background: linear-gradient(135deg, #00ffa3, #00d1ff);
  box-shadow: 0 12px 30px rgba(0,209,255,.22), 0 2px 0 rgba(255,255,255,.35) inset;
  animation: ${pulse} 2.2s ease-in-out infinite;
  &:hover { filter: brightness(1.05); }
`;
const NavBack = styled(NavButton)`
  color: #eaf6ff;
  background: linear-gradient(90deg, rgba(255,255,255,.12), rgba(255,255,255,.06));
  &:hover { filter: brightness(1.06); }
`;

function Step7() {
  const navigate = useNavigate();
  const progress = (11 / 18) * 100; // same logic as your original

  return (
    <Container>
      <Orbs><i /><i /><i /></Orbs>

      <Header>
        <Brand>
          <Logo aria-hidden="true" />
          <BrandName>AdventureHost</BrandName>
          <StepBadge>Step 11 of 18 • Finalize</StepBadge>
        </Brand>
        {/* Keep behavior same as your original (no handler change) */}
        <ButtonGhost aria-label="Save and exit">Save & exit</ButtonGhost>
      </Header>

      <Content>
        <Card>
          {/* LEFT: Title, Progress, Checklist */}
          <Left>
            <StepIndicator>Step 11 of 18</StepIndicator>
            <Title>Finalize Your Adventure</Title>
            <Sub>Complete these last checks to publish and start welcoming guests.</Sub>
            <RainbowBar />

            <ProgressWrap>
              <Circle $progress={progress}>
                <ProgressText>{Math.round(progress)}%</ProgressText>
              </Circle>
            </ProgressWrap>

            <Checklist>
              <CheckItem $ok>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <span>Adventure details completed</span>
              </CheckItem>

              <CheckItem $ok>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <span>Location verified</span>
              </CheckItem>

              <CheckItem>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1 14H9v-2h2v2zm0-4H9V8h2v4z"/>
                </svg>
                <span>Pricing setup required</span>
              </CheckItem>

              <CheckItem>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1 14H9v-2h2v2zm0-4H9V8h2v4z"/>
                </svg>
                <span>Safety verification pending</span>
              </CheckItem>
            </Checklist>
          </Left>

          {/* RIGHT: Helpful guidance (content only; no logic change) */}
          <Right>
            <Sub>Publishing Guide</Sub>
            <Guide>
              <ul style={{ margin: 0, paddingLeft: '1.1rem', lineHeight: 1.55 }}>
                <li><strong>Pricing:</strong> Add a clear base price and optional add-ons (gear rental, transport).</li>
                <li><strong>Safety:</strong> List guides’ certifications and emergency protocols for transparency.</li>
                <li><strong>Final Review:</strong> Re-check photos, titles, and map pin before you publish.</li>
                <li><strong>Communication:</strong> Enable quick replies—fast responses convert 2× better.</li>
              </ul>
            </Guide>
          </Right>
        </Card>
      </Content>

      {/* Bottom navigation (same routes) */}
      <NavBar>
        <NavBack onClick={() => navigate(-1)}>← Back</NavBack>
        <NavNext onClick={() => navigate('/step-8')}>Continue →</NavNext>
      </NavBar>

      {/* Global footer (matches earlier pages) */}
      <Footer />
    </Container>
  );
}

export default Step7;
