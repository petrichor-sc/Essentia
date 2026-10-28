import * as T from '../atlas/assets/three.module.js';
// Exaggerated qualitative contrast for teaching; these are animation settings,
// not measured evaporation constants or predictions of fragrance performance.
export const weatherProfiles={
 winter:{rate:3.2,spread:.14,life:5.5},
 temperate:{rate:6.2,spread:.34,life:5.2},
 summer:{rate:12.5,spread:.76,life:4.7}
};
export function sprayPhase(elapsed){
 return {reach:T.MathUtils.smoothstep(elapsed,0,.8)*(1-T.MathUtils.smoothstep(elapsed,1.4,2.3)),press:elapsed>=.85&&elapsed<1.2,applied:elapsed>=.96,done:elapsed>=2.35};
}
