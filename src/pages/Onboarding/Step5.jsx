import React, { useState, useRef } from 'react';
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

/* Header (same pattern as previous steps) */
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

const ButtonBase = styled.button`
  border: 1px solid rgba(255,255,255,.22);
  border-radius: 14px;
  padding: .9rem 1.1rem;
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

const ButtonGhost = styled(ButtonBase)`
  color: #eaf6ff;
  background: linear-gradient(90deg, rgba(255,255,255,.12), rgba(255,255,255,.06));
  &:hover { filter: brightness(1.06); }
`;

const ButtonPrimary = styled(ButtonBase)`
  color: #041a17;
  background: linear-gradient(135deg, #00ffa3, #00d1ff);
  box-shadow: 0 12px 30px rgba(0,209,255,.22), 0 2px 0 rgba(255,255,255,.35) inset;
  &:hover:not(:disabled) { filter: brightness(1.05); }
`;

const ContinueGlow = styled(ButtonPrimary)`
  animation: ${pulse} 2.2s ease-in-out infinite;
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
    grid-template-columns: 1.05fr .95fr;
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

/* Top title and accent */
const Title = styled.h2`
  margin: 0 0 .4rem 0;
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

/* Uploads */
const UploadBox = styled.div`
  border: 1px solid rgba(255,255,255,.18);
  border-radius: 16px;
  padding: 1.25rem;
  text-align: center;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: all .25s ease;
  background: rgba(255,255,255,.06);

  &:hover {
    filter: brightness(1.06);
    box-shadow: 0 10px 26px rgba(0,255,195,.12);
  }
`;

const UploadHint = styled.div`
  font-size: .92rem;
  color: #cfe8ff;
  margin-top: .4rem;
`;

const PreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  gap: .85rem;
  margin-top: 1rem;
`;

const Thumb = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,.16);
  background: rgba(255,255,255,.06);
`;

const ThumbImg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const RemoveBtn = styled.button`
  position: absolute;
  top: 6px;
  right: 6px;
  width: 26px;
  height: 26px;
  background: #ff4567;
  color: white;
  border: none;
  border-radius: 50%;
  display: grid;
  place-items: center;
  cursor: pointer;
  font-size: 14px;
  box-shadow: 0 6px 16px rgba(255,69,103,.35);
`;

/* Errors + helper */
const ErrorText = styled.p`
  color: #ff7b7b;
  font-weight: 600;
  margin: .5rem 0 0;
`;

/* Guide panel (read-only content, no logic change) */
const Guide = styled.div`
  border-radius: 16px;
  padding: 1rem;
  border: 1px dashed rgba(255,255,255,.16);
  background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.03));
  color: #cfe8ff;
  font-size: .92rem;
`;

/* Continue row */
const Row = styled.div`
  display: flex;
  gap: .6rem;
  flex-wrap: wrap;
  margin-top: 1rem;
`;

/* ===== Helpers (unchanged logic) ===== */
function isFileOrBlob(obj) {
  return obj && ((typeof File !== 'undefined' && obj instanceof File) || (typeof Blob !== 'undefined' && obj instanceof Blob));
}
function getImageUrl(image) {
  if (!image) return null;
  if (isFileOrBlob(image)) return URL.createObjectURL(image);
  if (typeof image === 'string' && image.trim() !== '') return image;
  return null;
}

/* ============ Component ============ */
const Step5 = () => {
  const navigate = useNavigate();
  const { onboardingData, updateStep } = useOnboarding();

  const [mainImage, setMainImage] = useState(onboardingData.step5?.mainImage || null);
  const [supportingImages, setSupportingImages] = useState(onboardingData.step5?.supportingImages || []);
  const [error, setError] = useState('');

  const mainImageRef = useRef();
  const supportingRef = useRef();

  const handleMainImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImage(file);
      setError('');
    }
  };

  const handleSupportingImages = (e) => {
    const files = Array.from(e.target.files);
    let newImages = [...supportingImages, ...files];
    newImages = newImages.filter(
      (img, idx, arr) => arr.findIndex(f => f.name === img.name && f.size === img.size) === idx
    );
    if (newImages.length > 5) {
      setError('Maximum 5 supporting images allowed');
      return;
    }
    setSupportingImages(newImages);
    setError('');
  };

  const removeMainImage = () => setMainImage(null);
  const removeSupportingImage = (index) => {
    const copy = [...supportingImages];
    copy.splice(index, 1);
    setSupportingImages(copy);
  };

  const handleNext = () => {
    if (!mainImage) {
      setError('Please upload a main featured image');
      return;
    }
    if (supportingImages.length < 3) {
      setError('Please upload at least 3 supporting images');
      return;
    }
    updateStep('step5', { mainImage, supportingImages });
    navigate('/step-6');
  };

  const mainImageUrl = getImageUrl(mainImage);

  return (
    <Container>
      <Orbs><i /><i /><i /></Orbs>

      {/* Header consistent with previous steps */}
      <Header>
        <Brand>
          <Logo aria-hidden="true" />
          <BrandName>AdventureHost</BrandName>
          <StepBadge>Step 5 of 5 • Media</StepBadge>
        </Brand>
        <ButtonGhost onClick={handleNext} aria-label="Skip this step">Skip</ButtonGhost>
      </Header>

      <Content>
        <Card>
          {/* LEFT: uploaders */}
          <Left>
            <Title>Upload Your Experience Media</Title>
            <Sub>Feature one main hero image and add 3–5 supporting images.</Sub>
            <RainbowBar />

            {/* Main Image Upload */}
            <UploadBox onClick={() => mainImageRef.current?.click()} role="button" aria-label="Upload main featured image">
              <input
                type="file"
                accept="image/*"
                ref={mainImageRef}
                onChange={handleMainImage}
                style={{ display: 'none' }}
              />
              {mainImageUrl ? (
                <Thumb>
                  <ThumbImg src={mainImageUrl} alt="Main" />
                  <RemoveBtn
                    onClick={(e) => { e.stopPropagation(); removeMainImage(); }}
                    aria-label="Remove main image"
                    title="Remove"
                  >
                    ×
                  </RemoveBtn>
                </Thumb>
              ) : (
                <>
                  <div style={{ fontWeight: 800, color: '#e6f1ff' }}>Click to upload main featured image</div>
                  <UploadHint>Recommended: 1600×900 or higher, landscape, JPG/PNG</UploadHint>
                </>
              )}
            </UploadBox>

            {/* Supporting Images Upload */}
            <UploadBox onClick={() => supportingRef.current?.click()} role="button" aria-label="Upload supporting images">
              <input
                type="file"
                multiple
                accept="image/*"
                ref={supportingRef}
                onChange={handleSupportingImages}
                style={{ display: 'none' }}
              />
              <div style={{ fontWeight: 800, color: '#e6f1ff' }}>
                Upload 3–5 supporting images ({supportingImages.length}/5)
              </div>
              <UploadHint>Show different angles, moments, group shots, safety gear, etc.</UploadHint>

              {supportingImages.length > 0 && (
                <PreviewGrid>
                  {supportingImages.map((img, index) => {
                    const url = getImageUrl(img);
                    return url ? (
                      <Thumb key={index}>
                        <ThumbImg src={url} alt={`Supporting ${index + 1}`} />
                        <RemoveBtn
                          onClick={(e) => { e.stopPropagation(); removeSupportingImage(index); }}
                          aria-label={`Remove supporting image ${index + 1}`}
                          title="Remove"
                        >
                          ×
                        </RemoveBtn>
                      </Thumb>
                    ) : null;
                  })}
                </PreviewGrid>
              )}
            </UploadBox>

            {error && <ErrorText role="alert">{error}</ErrorText>}

            <Row>
              <ButtonGhost onClick={() => { /* just a quick clear for convenience */ }}>
                {/* no state reset to avoid accidental deletes; keeping logic unchanged */}
                Tips Only
              </ButtonGhost>
              <ContinueGlow onClick={handleNext}>
                Continue
              </ContinueGlow>
            </Row>
          </Left>

          {/* RIGHT: guide/help (content only) */}
          <Right>
            <Sub>Quick Media Guide</Sub>
            <Guide>
              <ul style={{ margin: 0, paddingLeft: '1.1rem', lineHeight: 1.55 }}>
                <li><strong>Main Image:</strong> A clear, exciting hero shot. Landscape works best.</li>
                <li><strong>Supporting:</strong> Include safety gear, terrain, group vibe, and a close-up.</li>
                <li><strong>Quality:</strong> Bright, in-focus, no heavy text overlays. JPG/PNG recommended.</li>
                <li><strong>People:</strong> Smiles + activity in action convert better than empty landscapes.</li>
                <li><strong>Legal:</strong> Upload only media you own or have permission to use.</li>
              </ul>
            </Guide>

            <Sub style={{ marginTop: '1rem' }}>Live Summary</Sub>
            <Guide as="div">
              <div style={{ fontWeight: 800, color: '#e6f1ff' }}>
                Main: <span style={{ color: mainImage ? '#7bffdc' : '#9fb3d9' }}>
                  {mainImage ? (isFileOrBlob(mainImage) ? mainImage.name : 'Selected') : 'Not selected'}
                </span>
              </div>
              <div style={{ marginTop: '.35rem', color: '#cfe8ff' }}>
                Supporting: <span style={{ color: supportingImages.length ? '#00ffa3' : '#9fb3d9' }}>
                  {supportingImages.length}/5
                </span>
              </div>
            </Guide>
          </Right>
        </Card>
      </Content>

      {/* Footer same as previous pages */}
      <Footer />
    </Container>
  );
};

export default Step5;
