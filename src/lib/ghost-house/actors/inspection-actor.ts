import Actor from "$lib/aura/scenes/actor";
import type Scene from "$lib/aura/scenes/scene";
import type Region from "$lib/aura/utils/region";
import InspectionMaterial from "$lib/ghost-house/actors/inspection-material";
import type {FurnitureContent} from "$lib/ghost-house/actors/furniture-actor";
import inspection from "$lib/ghost-house/globals/inspection";
import tooltip from "$lib/ghost-house/globals/tooltip";
import actions from "$lib/ghost-house/globals/actions";
import mansion from "$lib/ghost-house/globals/mansion";
import Color from "$lib/aura/utils/color";

export default class InspectionActor extends Actor {
    constructor(scene: Scene, region: Region) {
        super(scene, region, new InspectionMaterial());
    }

    start() {
        const furniture = inspection.furniture;

        if (furniture === undefined) {
            throw new Error("There's no furniture for inspection. You didn't set a furniture in inspection.");
        }

        const content: FurnitureContent = furniture.content;

        tooltip.color = Color.hex(0xCCCCCC);
        if (content === 'empty') {
            actions.setActions([
                [['Quit', () => this.game.loadScene(mansion.getFloorSceneName())], undefined],
                [undefined, undefined]
            ]);

            tooltip.text = `"There's nothing to see"`;
        } else {
            actions.setActions([
                [
                    [
                        'Continue', 
                        () => {
                            switch (content) {
                                case "ghost":
                                    this.game.loadScene('Fight');
                                    break;

                                case "item":
                                    alert("Wants an item");
                                    break;
                            }
                        }
                    ],
                    [
                        'Quit',
                        () => {
                            this.game.loadScene(mansion.getFloorSceneName());
                        }
                    ]
                ],
                [
                    undefined,
                    undefined
                ]
            ]);

            switch (content) {
                case "ghost":
                    tooltip.text = `"I clearly feel the presence of evil spirits in this ${furniture.name.toLowerCase()}"`;
                    break;

                case "item":
                    tooltip.text = `"This ${furniture.name.toLowerCase()} feels plain and simple."`;
                    break;
            }
        }

        super.start();
    }
}