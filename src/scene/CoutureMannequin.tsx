import { RetailMannequin } from './RetailMannequin';

interface CoutureMannequinProps {
  finish?: 'linen-brass' | 'charcoal-noir' | 'raw-canvas' | 'porcelain-matte';
  showStandOnly?: boolean;
}

/**
 * THE THREADOR — COUTURE DRESSFORM & RETAIL DISPLAY MANNEQUIN
 * Upgraded to professional faceless display form (Reference 2).
 */
export function CoutureMannequin({
  finish = 'linen-brass'
}: CoutureMannequinProps) {
  const mappedFinish = finish === 'charcoal-noir' ? 'matte-graphite' : 'porcelain-matte';

  return (
    <group position={[0, -0.65, 0]}>
      <RetailMannequin
        gender="women"
        finish={mappedFinish}
        showHead={true}
        showArms={true}
        showLegs={false}
      />
    </group>
  );
}
