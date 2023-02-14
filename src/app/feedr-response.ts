import { Story } from "./story"

export interface FeedrResponse {
    responseData: {
        feed: {
            entries: Story[]
        }
    }
}