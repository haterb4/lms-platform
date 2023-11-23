export const CreateTeacherRequiredFieds: RequiredFields = {
    body: {
        auth: { value: "string" },
        email: { value: "string" },
        firstName: { value: "string" },
        educationLevel: { value: "string" },
        address: {
            value: {
                country: { value: "string" },
                city: { value: "string" },
                neighborhood: { value: "string" }
            }
        },
        dateOfBirth: { value: 'number' },
        teachingExperienceYears: { value: "number" },
    }
}