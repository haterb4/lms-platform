export const CreateStudentRequiredFieds: RequiredFields = {
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
        }
    }
}

export const UpdateStudentRequiredFields: RequiredFields = {
    params: {
        id: { value: "string" }
    }
}