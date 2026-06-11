export type ChatRole = "user" | "assistant";

export interface ChatMessage {
    id: string;
    role: ChatRole;
    content: string;
    timestamp: number;
}
export type ChatStatus = "idle" | "loading" | "error";
// export type FlowState = 
//     | "IDLE"
//     | "GREETING"
//     | "ASK_CHALLENGE"
//     | "SUGGEST_SERVICE"
//     | "COLLECT_LEAD"
//     | "SAVE_LEAD"
//     | "FAREWELL";

export type ServiceType =
    | "ai-agents"
    | "ecommerce-solutions"
    | "graphic-design";

export interface LeadInfo {
    name: string;
    email: string;
    company?: string;
    message?: string;
    interestedService: ServiceType | null;
    timestamp: string; //ISO 8601
}

export interface ChatInput {
    messages: Array<{
        role: ChatRole;
        content: string;
    }>;
}

export interface ChatOutput {
    reply: string;
}

export interface LeadsApiRequest {
    lead: LeadInfo;
}

export interface LeadsApiResponse {
    success: boolean;
    message: string;
}
