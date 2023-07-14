import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Meet } from "./modelMeet.schema";
import mongoose, { HydratedDocument} from "mongoose";

export type objectMeetDocument = HydratedDocument<objectMeet>

@Schema()
export class objectMeet{
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Meet'})
    meet: Meet;

    @Prop({required: true})
    name: string;

    @Prop({required: true})
    x: number;

    @Prop({required: true})
    y:number;

    @Prop({required: true})
    zIndex: number;

    @Prop()
    orientation: string;
}

export const meetObject = SchemaFactory.createForClass(objectMeet);