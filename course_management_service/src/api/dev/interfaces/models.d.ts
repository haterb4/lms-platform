interface IRetranscription {
    language: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

interface IVideo {
    title: string;
    url: string;
    duration: number;
    retranscription: IRetranscription[];
    uploadedAt: Date;
    author: string;
}

interface ILecture {
    title: string;
    language: string;
    url: string;
    duration: number;
    author: string;
    createdAt: Date;
    updatedAt: Date;
}

interface IQuizzQuestions {
    domains: string[];
    question: string;
    difficulty: string;
    propositions: string[];
    responses: numbers[];
    createdAt: Date;
    updatedAt: Date;
}

interface IQuizz {
    categories: string[];
    questions: IQuizzQuestions[];
    createdAt: Date;
    updatedAt: Date;
}

interface ILessons {
    title: string;
    videos: IVideo[];
    lectures: ILecture[];
    quizz: IQuizz[];
    createdAt: Date;
    updatedAt: Date;
}