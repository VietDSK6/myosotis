import axios from 'axios';

const mmseAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface MMSETestInfo {
  id: string;
  name: string;
  version: string;
  description: string;
  total_questions: number;
  max_score: number;
  estimated_duration_minutes: number;
  created_date: string;
  language: string;
}

export interface MMSEQuestion {
  id: string;
  text: string;
  type: 'select' | 'number' | 'text' | 'multi-select';
  required: boolean;
  score_points: number;
  options?: {
    value: string;
    label: string;
    media?: {
      type: 'audio' | 'image';
      url: string;
      description: string;
    } | null;
  }[] | null;
  media?: {
    type: 'audio' | 'image';
    url: string;
    description: string;
  }[] | null;
  time_limit_seconds?: number | null;
  placeholder?: string | null;
  validation_rule?: string | null;
}

export interface MMSESection {
  id: string;
  title: string;
  description: string;
  instruction?: string | null;
  order: number;
  media?: {
    type: 'audio' | 'image';
    url: string;
    description: string;
  }[] | null;
  questions: MMSEQuestion[];
  estimated_time_minutes: number;
  section_type: string;
}

export interface MMSETestData {
  test_info: MMSETestInfo;
  sections: MMSESection[];
  interpretation_guide: {
    cognitive_levels: {
      score_range: string;
      meaning: string;
      recommendation: string;
    }[];
    notes: string;
  };
  ui_config: Record<string, unknown>;
}

export interface MMSEAnswer {
  section_index: number;
  question_index: number;
  answer: string | string[]; 
}

export interface MMSESubmissionPayload {
  user_id: number;
  answers: MMSEAnswer[];
}

export interface MMSETestResult {
  success: boolean;
  message: string;
  data: {
    assessment_id: number;
    user_id: number;
    total_score: number;
    max_score: number;
    percentage: number;
    interpretation: {
      level: string;
      score_range: string;
    };
    completed_at: string;
    saved_to_database: boolean;
  };
}

export interface MMSEHistoryItem {
  assessment_id: number;
  test_date: string;
  total_score: number;
  max_score: number;
  percentage: number;
  interpretation: {
    level: string;
    score_range: string;
  };
}

export interface ApiResponse<T> {
  http_code: number;
  success: boolean;
  message: string | null;
  metadata: Record<string, unknown> | null;
  data: T;
}



export const getMMSEInfo = async (): Promise<ApiResponse<MMSETestData>> => {
  try {
    const response = await mmseAPI.get('/api/v1/assessments/mmse/infor');
    console.log('MMSE Info response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching MMSE info:', error);
    throw error;
  }
};



export const submitMMSETest = async (payload: MMSESubmissionPayload): Promise<ApiResponse<MMSETestResult>> => {
  try {
    const response = await mmseAPI.post('/api/v1/assessments/mmse/submit', payload);
    console.log('MMSE submission response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error submitting MMSE test:', error);
    throw error;
  }
};



export const getMMSEHistory = async (userId: number): Promise<ApiResponse<MMSEHistoryItem[]>> => {
  try {
    const response = await mmseAPI.get(`/api/v1/assessments/mmse/history?user_id=${userId}`);
    console.log('MMSE history response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching MMSE history:', error);
    throw error;
  }
};
