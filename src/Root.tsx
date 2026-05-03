import {Composition} from 'remotion';
import {CoffeeBrandComposition} from './CoffeeBrandComposition';
import {MindfulSpaceDemoComposition} from './MindfulSpaceDemoComposition';
import {SparenginePromoComposition} from './SparenginePromoComposition';
import {BasedReferenceComposition} from './BasedReferenceComposition';
import {ZeliosDashboardComposition} from './ZeliosDashboardComposition';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="coffee-brand"
        component={CoffeeBrandComposition}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="mindfulspace-demo"
        component={MindfulSpaceDemoComposition}
        durationInFrames={900}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="sparengine-promo"
        component={SparenginePromoComposition}
        durationInFrames={900}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="based-reference-promo"
        component={BasedReferenceComposition}
        durationInFrames={900}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="zelios-dashboard"
        component={ZeliosDashboardComposition}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
