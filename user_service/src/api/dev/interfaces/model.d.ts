interface PhoneNumber {
    comCode: number;
    phoneLine: number;
}

interface Address {
    country: string;
    city: string;
    neighborhood: string;
}

interface IUser {
    auth: mongoose.Types.ObjectId;
    email: string;
    firstName: string;
    lastName: string;
    nickName: string;
    dateOfBirth: Date;
    avatar: string;
    pageImage: string;
    phoneNumber: PhoneNumber;
    educationLevel: string;
    interests: string[];
    address: Address;
    createdAt: Date;
    updatedAt: Date;
}


interface UserInterfacePreferences {
    theme: string;
    colorScheme: string;
    layout: string;
    fontSize: number;
}
  
//préférences de notification
interface NotificationPreferences {
    notificationMethod: string;
    notificationFrequency: string;
    notificationTypes: string[];
}
  
//préférences d'organisation du contenu
interface ContentOrganizationPreferences {
    contentFormat: string;
    contentLayout: string;
    contentLanguage: string;
}
  
//préférences d'accessibilité
interface AccessibilityPreferences {
    textSize: number;
    accessibilityOptions: string[];
}
  
//préférences de collaboration
interface CollaborationPreferences {
    communicationMethod: string;
    privacySettings: string;
}
  
//préférences de suivi et de progression
interface ProgressTrackingPreferences {
    progressView: string;
    progressReportFrequency: string;
}
  
//préférences d'évaluation
interface AssessmentPreferences {
    assessmentFormat: string;
    assessmentMethods: string[];
}
  
//préférences de disponibilité
interface AvailabilityPreferences {
    notificationSchedule: string;
    realTimeInteractionAvailability: string;
}
  
interface IStudentPreferences {
    student: mongoose.Types.ObjectId;
    interfacePreferences: UserInterfacePreferences;
    notificationPreferences: NotificationPreferences;
    contentOrganizationPreferences: ContentOrganizationPreferences;
    accessibilityPreferences: AccessibilityPreferences;
    collaborationPreferences: CollaborationPreferences;
    progressTrackingPreferences: ProgressTrackingPreferences;
    assessmentPreferences: AssessmentPreferences;
    availabilityPreferences: AvailabilityPreferences;
}

interface ITeacherPreferences {
    teacher: mongoose.Types.ObjectId;
    interfacePreferences: UserInterfacePreferences;
    notificationPreferences: NotificationPreferences;
    contentOrganizationPreferences: ContentOrganizationPreferences;
    accessibilityPreferences: AccessibilityPreferences;
    collaborationPreferences: CollaborationPreferences;
    availabilityPreferences: AvailabilityPreferences;
}