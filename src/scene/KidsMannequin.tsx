import { RetailMannequin } from './RetailMannequin';

interface KidsMannequinProps {
  finish?: 'porcelain-linen' | 'warm-ivory' | 'ebonized-noir';
  showStandOnly?: boolean;
}

/**
 * THE THREADOR — JUVENILE RETAIL DISPLAY MANNEQUIN
 * Upgraded to professional faceless child display form (Reference 2).
 */
export function KidsMannequin({
  finish = 'porcelain-linen'
}: KidsMannequinProps) {
  const mappedFinish = finish === 'ebonized-noir' ? 'matte-graphite' : 'porcelain-matte';

  return (
    <group position={[0, -0.65, 0]}>
      <RetailMannequin
        gender="kids"
        finish={mappedFinish}
        showHead={true}
        showArms={true}
        showLegs={false}
      />
    </group>
  );
}
