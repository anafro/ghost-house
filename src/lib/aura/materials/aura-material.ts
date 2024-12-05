import Material from "$lib/aura/rendering/material";
import Pixel from "../rendering/pixel";
import type Actor from "../scenes/actor";
import Vector2 from "../utils/vector-2";
import Color from "$lib/aura/utils/color";
import {clamp, smoothStep} from "$lib/aura/math/clamp";
import Time from "$lib/aura/time/time";
import Matrix2x2 from "$lib/aura/math/matrix";

export default class AuraMaterial extends Material {
    private static readonly SHAPE_SIZE = .618;
    private static readonly CHROMATIC_ABBERATION = .2;
    private static readonly ITERATIONS = 2.;
    private static readonly INITIAL_LUMA = 0.9;
    private static readonly PI = 3.14159265359;
    private static readonly TWO_PI = 6.28318530718;

    public renderAt(actor: Actor, coordinate: Vector2): Pixel | undefined {
        coordinate = coordinate.minus(new Vector2(Time.sinAnimate(6.000, -50, -30), Time.sinAnimate(4.000, -30, -20, 2.000)));
        let blur = Time.sinAnimate(3.000, 1, 2) + Time.sinAnimate(1.000, 0, 0.1);
        const resolution = actor.getRegion().copy().resized(2).getResolution();

        let st: Vector2 = coordinate.times(2).minus(resolution).over(Math.min(resolution.x, resolution.y));
        const origSt: Vector2 = st.copy();
        const globalRotation = Matrix2x2.createRotationMatrix(Math.sin(Time.getCurrentTimeSeconds() * .14) * .1)

        st = globalRotation
            .times(st)
            .times(Math.sin(Time.getCurrentTimeSeconds() * .85) + 2.)
            .times(.3)

        st = st
            .times(Math.log(st.length * Time.sinAnimate(7.000, .428, 1.428)))
            .times(1.1);

        const modScale = 1.;
        let color = Color.BLACK.copy();
        let luma = AuraMaterial.INITIAL_LUMA;

        for (let i = 0.; i < AuraMaterial.ITERATIONS; i++) {
            const center = st.plus(new Vector2(Math.sin(Time.getCurrentTimeSeconds() * .12), Math.cos(Time.getCurrentTimeSeconds() * .13)));

            //center += pow(length(center), 1.);
            const shapeColor = Color.alpha(
                this.getColorComponent(center.minus(st.times(AuraMaterial.CHROMATIC_ABBERATION)), modScale, blur),
                this.getColorComponent(center, modScale, blur),
                this.getColorComponent(center.plus(st.times(AuraMaterial.CHROMATIC_ABBERATION)), modScale, blur)
            ).times(luma);

            st = st.times(1.1 + this.getColorComponent(center, modScale, .04) * 1.2);
            st = Matrix2x2.createRotationMatrix(Math.sin(Time.getCurrentTimeSeconds() * .05) * 1.33).times(st);
            color.add(shapeColor);
            luma *= .6;
            blur *= .63;
        }

        const GRADING_INTENSITY = .8;

        const topGrading = Color.alpha(
            1. + Math.sin(Time.getCurrentTimeSeconds() * 1.13 * .3) * GRADING_INTENSITY,
            1. + Math.sin(Time.getCurrentTimeSeconds() * 1.23 * .3) * GRADING_INTENSITY,
            1. - Math.sin(Time.getCurrentTimeSeconds() * 1.33 * .3) * GRADING_INTENSITY
        );

        const bottomGrading = Color.alpha(
            1. - Math.sin(Time.getCurrentTimeSeconds() * 1.43 * .3) * GRADING_INTENSITY,
            1. - Math.sin(Time.getCurrentTimeSeconds() * 1.53 * .3) * GRADING_INTENSITY,
            1. + Math.sin(Time.getCurrentTimeSeconds() * 1.63 * .3) * GRADING_INTENSITY
        );

        const origDist = origSt.length;
        const colorGrading = Color.pickFromLinearGradient(topGrading, bottomGrading, origDist - .5);
        const materialColor = Color.alpha(
            Math.pow(color.r / 255, colorGrading.r / 255),
            Math.pow(color.g / 255, colorGrading.g / 255),
            Math.pow(color.b / 255, colorGrading.b / 255),
        );

        materialColor.multiply(smoothStep(2.1, .7, origDist));

        return new Pixel('$', materialColor);
    }

    private sdPolygon(angle: number, /*TODO: in*/ distance: number) {
        const segment = AuraMaterial.TWO_PI / 4.0;
        return Math.cos(Math.floor(.5 + angle / segment) * segment - angle) * distance;
    }

    private getColorComponent(/*TODO: in*/ st: Vector2, /*TODO: in*/ modScale: number, /*TODO: in*/ blur: number) {
        const modSt: Vector2 = new Vector2(st.x % (1. / modScale), st.y % (1. / modScale)).times(modScale).times(2).subtract(1);
        let dist = modSt.length;
        const angle = Math.atan2(modSt.y, modSt.x) + Math.sin(Time.getCurrentTimeSeconds() * .08) * 9.0;
        dist = this.sdPolygon(angle, dist);
        // dist += Math.sin(angle * 3. + Time.getCurrentTimeSeconds() * .21) * .2 + Math.cos(angle * 4. - Time.getCurrentTimeSeconds() * .3) * .1;
        return smoothStep(AuraMaterial.SHAPE_SIZE + blur, AuraMaterial.SHAPE_SIZE - blur, Math.sin(dist * 3.0) * .5 + .5);
    }
}