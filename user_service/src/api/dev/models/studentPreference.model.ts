import mongoose, { Schema, Document } from 'mongoose';

export interface ISPreferences extends IStudentPreferences, mongoose.Document {}

export const UserInterfacePreferencesSchema = new Schema<UserInterfacePreferences>({
    theme: { type: String, required: false },
    colorScheme: { type: String, required: false },
    layout: { type: String, required: false },
    fontSize: { type: Number, required: false },
});

export const NotificationPreferencesSchema = new Schema<NotificationPreferences>({
    notificationMethod: { type: String, required: false },
    notificationFrequency: { type: String, required: false },
    notificationTypes: { type: [String], required: false },
})

export const ContentOrganizationPreferencesSchema = new Schema<ContentOrganizationPreferences>({
    contentFormat: { type: String, required: false },
    contentLayout: { type: String, required: false },
    contentLanguage: { type: String, required: false },
})

export const AccessibilityPreferencesSchema = new Schema<AccessibilityPreferences>({
    textSize: { type: Number, required: false },
    accessibilityOptions: { type: [String], required: false },
})
export const CollaborationPreferencesSchema = new Schema<CollaborationPreferences>({
    communicationMethod: { type: String, required: false },
    privacySettings: { type: String, required: false },
})
const ProgressTrackingPreferencesSchema = new Schema<ProgressTrackingPreferences>({
    progressView: { type: String, required: false },
    progressReportFrequency: { type: String, required: false },
})
const AssessmentPreferencesSchema = new Schema<AssessmentPreferences>({
    assessmentFormat: { type: String, required: false },
    assessmentMethods: { type: [String], required: false },
})
export const AvailabilityPreferencesSchema = new Schema<AvailabilityPreferences>({
    notificationSchedule: { type: String, required: false },
    realTimeInteractionAvailability: { type: String, required: false },
})

const StudentPreferencesSchema = new Schema<ISPreferences>({
    student: { type: mongoose.Types.ObjectId, ref: 'Student', required: true, unique: true },
    interfacePreferences: { type: UserInterfacePreferencesSchema,required: false},
    notificationPreferences: { type: NotificationPreferencesSchema,required: false},
    contentOrganizationPreferences: { type: ContentOrganizationPreferencesSchema,required: false},
    accessibilityPreferences: { type: AccessibilityPreferencesSchema,required: false},
    collaborationPreferences: { type: CollaborationPreferencesSchema,required: false},
    progressTrackingPreferences: { type: ProgressTrackingPreferencesSchema,required: false},
    assessmentPreferences: { type: AssessmentPreferencesSchema,required: false},
    availabilityPreferences: { type: AvailabilityPreferencesSchema,required: false},    
},{
    timestamps: true
});

const StudentPreferenesModel = mongoose.model<ISPreferences & Document>('StudentPreferences', StudentPreferencesSchema);

export default StudentPreferenesModel