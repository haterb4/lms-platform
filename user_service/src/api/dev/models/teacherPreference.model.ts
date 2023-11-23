import mongoose, { Schema, Document } from 'mongoose';
import {
    AccessibilityPreferencesSchema,
    AvailabilityPreferencesSchema,
    CollaborationPreferencesSchema,
    ContentOrganizationPreferencesSchema,
    NotificationPreferencesSchema,
    UserInterfacePreferencesSchema
} from './studentPreference.model';

export interface ITPreferences extends ITeacherPreferences, mongoose.Document {}

const TeacherPreferencesSchema = new Schema<ITPreferences>({
    teacher: { type: mongoose.Types.ObjectId, ref: 'Teacher', required: true, unique: true },
    interfacePreferences: { type: UserInterfacePreferencesSchema,required: false},
    notificationPreferences: { type: NotificationPreferencesSchema,required: false},
    contentOrganizationPreferences: { type: ContentOrganizationPreferencesSchema,required: false},
    accessibilityPreferences: { type: AccessibilityPreferencesSchema,required: false},
    collaborationPreferences: { type: CollaborationPreferencesSchema,required: false},
    availabilityPreferences: { type: AvailabilityPreferencesSchema,required: false},    
},{
    timestamps: true
});

const TeacherPreferenesModel = mongoose.model<ITPreferences & Document>('TeacherPreferences', TeacherPreferencesSchema);

export default TeacherPreferenesModel