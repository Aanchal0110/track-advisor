export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      alumni: {
        Row: {
          available_for_mentorship: boolean | null
          created_at: string | null
          current_company: string | null
          current_position: string | null
          degree: string
          department: string
          expertise: string[] | null
          graduation_year: number
          id: string
          linkedin_url: string | null
          location: string | null
          name: string
          profile_image: string | null
        }
        Insert: {
          available_for_mentorship?: boolean | null
          created_at?: string | null
          current_company?: string | null
          current_position?: string | null
          degree: string
          department: string
          expertise?: string[] | null
          graduation_year: number
          id?: string
          linkedin_url?: string | null
          location?: string | null
          name: string
          profile_image?: string | null
        }
        Update: {
          available_for_mentorship?: boolean | null
          created_at?: string | null
          current_company?: string | null
          current_position?: string | null
          degree?: string
          department?: string
          expertise?: string[] | null
          graduation_year?: number
          id?: string
          linkedin_url?: string | null
          location?: string | null
          name?: string
          profile_image?: string | null
        }
        Relationships: []
      }
      badges: {
        Row: {
          badge_name: string
          created_at: string | null
          criteria: string
          description: string
          icon: string
          id: string
          points: number
        }
        Insert: {
          badge_name: string
          created_at?: string | null
          criteria: string
          description: string
          icon: string
          id?: string
          points: number
        }
        Update: {
          badge_name?: string
          created_at?: string | null
          criteria?: string
          description?: string
          icon?: string
          id?: string
          points?: number
        }
        Relationships: []
      }
      certifications: {
        Row: {
          certification_name: string
          certification_url: string | null
          cost: number | null
          created_at: string | null
          description: string
          duration: string
          id: string
          provider: string
          track_id: string | null
        }
        Insert: {
          certification_name: string
          certification_url?: string | null
          cost?: number | null
          created_at?: string | null
          description: string
          duration: string
          id?: string
          provider: string
          track_id?: string | null
        }
        Update: {
          certification_name?: string
          certification_url?: string | null
          cost?: number | null
          created_at?: string | null
          description?: string
          duration?: string
          id?: string
          provider?: string
          track_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "certifications_track_id_fkey"
            columns: ["track_id"]
            isOneToOne: false
            referencedRelation: "tracks"
            referencedColumns: ["id"]
          },
        ]
      }
      company_culture: {
        Row: {
          avg_rating: number
          benefits: string[]
          company_name: string
          created_at: string | null
          culture_score: number
          employee_reviews: number
          id: string
          work_life_balance: number
        }
        Insert: {
          avg_rating: number
          benefits: string[]
          company_name: string
          created_at?: string | null
          culture_score: number
          employee_reviews: number
          id?: string
          work_life_balance: number
        }
        Update: {
          avg_rating?: number
          benefits?: string[]
          company_name?: string
          created_at?: string | null
          culture_score?: number
          employee_reviews?: number
          id?: string
          work_life_balance?: number
        }
        Relationships: []
      }
      feedback: {
        Row: {
          created_at: string
          feedback_text: string | null
          id: string
          improvement_suggestions: string | null
          quiz_helpfulness: number | null
          quiz_result_id: string | null
          rating: number
          satisfaction_level: string
          track_id: string | null
          track_usefulness: number | null
          updated_at: string
          user_id: string
          would_recommend: boolean | null
        }
        Insert: {
          created_at?: string
          feedback_text?: string | null
          id?: string
          improvement_suggestions?: string | null
          quiz_helpfulness?: number | null
          quiz_result_id?: string | null
          rating: number
          satisfaction_level: string
          track_id?: string | null
          track_usefulness?: number | null
          updated_at?: string
          user_id: string
          would_recommend?: boolean | null
        }
        Update: {
          created_at?: string
          feedback_text?: string | null
          id?: string
          improvement_suggestions?: string | null
          quiz_helpfulness?: number | null
          quiz_result_id?: string | null
          rating?: number
          satisfaction_level?: string
          track_id?: string | null
          track_usefulness?: number | null
          updated_at?: string
          user_id?: string
          would_recommend?: boolean | null
        }
        Relationships: []
      }
      growth_predictions: {
        Row: {
          confidence_level: string
          created_at: string | null
          current_demand: number
          id: string
          key_drivers: string[]
          predicted_growth: number
          time_horizon: string
          track_name: string
        }
        Insert: {
          confidence_level: string
          created_at?: string | null
          current_demand: number
          id?: string
          key_drivers: string[]
          predicted_growth: number
          time_horizon: string
          track_name: string
        }
        Update: {
          confidence_level?: string
          created_at?: string | null
          current_demand?: number
          id?: string
          key_drivers?: string[]
          predicted_growth?: number
          time_horizon?: string
          track_name?: string
        }
        Relationships: []
      }
      interest_surveys: {
        Row: {
          completed_at: string | null
          id: string
          interest_area: string
          interest_level: number
          related_careers: string[]
          user_id: string | null
        }
        Insert: {
          completed_at?: string | null
          id?: string
          interest_area: string
          interest_level: number
          related_careers: string[]
          user_id?: string | null
        }
        Update: {
          completed_at?: string | null
          id?: string
          interest_area?: string
          interest_level?: number
          related_careers?: string[]
          user_id?: string | null
        }
        Relationships: []
      }
      interview_questions: {
        Row: {
          category: string
          created_at: string | null
          difficulty_level: string
          id: string
          question_text: string
          sample_answer: string
          tips: string[]
        }
        Insert: {
          category: string
          created_at?: string | null
          difficulty_level: string
          id?: string
          question_text: string
          sample_answer: string
          tips: string[]
        }
        Update: {
          category?: string
          created_at?: string | null
          difficulty_level?: string
          id?: string
          question_text?: string
          sample_answer?: string
          tips?: string[]
        }
        Relationships: []
      }
      job_listings: {
        Row: {
          apply_url: string | null
          company_name: string
          description: string
          id: string
          job_title: string
          job_type: string
          location: string
          posted_at: string | null
          requirements: string[]
          salary_range: string
        }
        Insert: {
          apply_url?: string | null
          company_name: string
          description: string
          id?: string
          job_title: string
          job_type: string
          location: string
          posted_at?: string | null
          requirements: string[]
          salary_range: string
        }
        Update: {
          apply_url?: string | null
          company_name?: string
          description?: string
          id?: string
          job_title?: string
          job_type?: string
          location?: string
          posted_at?: string | null
          requirements?: string[]
          salary_range?: string
        }
        Relationships: []
      }
      location_insights: {
        Row: {
          avg_salary: number
          city: string
          cost_of_living_index: number
          country: string
          created_at: string | null
          id: string
          job_opportunities: number
          tech_ecosystem_score: number
          top_companies: string[]
        }
        Insert: {
          avg_salary: number
          city: string
          cost_of_living_index: number
          country: string
          created_at?: string | null
          id?: string
          job_opportunities: number
          tech_ecosystem_score: number
          top_companies: string[]
        }
        Update: {
          avg_salary?: number
          city?: string
          cost_of_living_index?: number
          country?: string
          created_at?: string | null
          id?: string
          job_opportunities?: number
          tech_ecosystem_score?: number
          top_companies?: string[]
        }
        Relationships: []
      }
      market_insights: {
        Row: {
          created_at: string | null
          demand_score: number
          growth_rate: number
          id: string
          job_openings: number
          median_salary: number
          role_title: string
          skills_required: string[]
        }
        Insert: {
          created_at?: string | null
          demand_score: number
          growth_rate: number
          id?: string
          job_openings: number
          median_salary: number
          role_title: string
          skills_required: string[]
        }
        Update: {
          created_at?: string | null
          demand_score?: number
          growth_rate?: number
          id?: string
          job_openings?: number
          median_salary?: number
          role_title?: string
          skills_required?: string[]
        }
        Relationships: []
      }
      mentors: {
        Row: {
          created_at: string | null
          department: string
          designation: string
          expertise: string[]
          id: string
          name: string
          photo_url: string | null
          profile_url: string | null
        }
        Insert: {
          created_at?: string | null
          department: string
          designation: string
          expertise: string[]
          id?: string
          name: string
          photo_url?: string | null
          profile_url?: string | null
        }
        Update: {
          created_at?: string | null
          department?: string
          designation?: string
          expertise?: string[]
          id?: string
          name?: string
          photo_url?: string | null
          profile_url?: string | null
        }
        Relationships: []
      }
      networking_events: {
        Row: {
          created_at: string | null
          description: string
          event_date: string
          event_name: string
          event_type: string
          id: string
          is_virtual: boolean | null
          location: string
          organizer: string
          registration_url: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          event_date: string
          event_name: string
          event_type: string
          id?: string
          is_virtual?: boolean | null
          location: string
          organizer: string
          registration_url?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          event_date?: string
          event_name?: string
          event_type?: string
          id?: string
          is_virtual?: boolean | null
          location?: string
          organizer?: string
          registration_url?: string | null
        }
        Relationships: []
      }
      peer_groups: {
        Row: {
          created_at: string | null
          description: string
          group_name: string
          id: string
          is_active: boolean | null
          meeting_schedule: string | null
          member_count: number
          skill_level: string
          track_id: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          group_name: string
          id?: string
          is_active?: boolean | null
          meeting_schedule?: string | null
          member_count?: number
          skill_level: string
          track_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          group_name?: string
          id?: string
          is_active?: boolean | null
          meeting_schedule?: string | null
          member_count?: number
          skill_level?: string
          track_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "peer_groups_track_id_fkey"
            columns: ["track_id"]
            isOneToOne: false
            referencedRelation: "tracks"
            referencedColumns: ["id"]
          },
        ]
      }
      personality_assessments: {
        Row: {
          career_matches: string[]
          completed_at: string | null
          id: string
          personality_type: string
          traits: Json
          user_id: string | null
        }
        Insert: {
          career_matches: string[]
          completed_at?: string | null
          id?: string
          personality_type: string
          traits: Json
          user_id?: string | null
        }
        Update: {
          career_matches?: string[]
          completed_at?: string | null
          id?: string
          personality_type?: string
          traits?: Json
          user_id?: string | null
        }
        Relationships: []
      }
      portfolios: {
        Row: {
          created_at: string | null
          description: string
          id: string
          project_url: string | null
          technologies: string[]
          title: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: string
          project_url?: string | null
          technologies: string[]
          title: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: string
          project_url?: string | null
          technologies?: string[]
          title?: string
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          branch_stream: string | null
          college_name: string | null
          created_at: string
          full_name: string
          id: string
          interests: string[] | null
          phone_number: string | null
          updated_at: string
          user_id: string
          year_of_study: string | null
        }
        Insert: {
          branch_stream?: string | null
          college_name?: string | null
          created_at?: string
          full_name: string
          id?: string
          interests?: string[] | null
          phone_number?: string | null
          updated_at?: string
          user_id: string
          year_of_study?: string | null
        }
        Update: {
          branch_stream?: string | null
          college_name?: string | null
          created_at?: string
          full_name?: string
          id?: string
          interests?: string[] | null
          phone_number?: string | null
          updated_at?: string
          user_id?: string
          year_of_study?: string | null
        }
        Relationships: []
      }
      quiz_questions: {
        Row: {
          correct_answer: number
          created_at: string
          difficulty: string
          explanation: string | null
          id: string
          options: Json
          question_text: string
          track_id: string
        }
        Insert: {
          correct_answer: number
          created_at?: string
          difficulty: string
          explanation?: string | null
          id?: string
          options: Json
          question_text: string
          track_id: string
        }
        Update: {
          correct_answer?: number
          created_at?: string
          difficulty?: string
          explanation?: string | null
          id?: string
          options?: Json
          question_text?: string
          track_id?: string
        }
        Relationships: []
      }
      quiz_results: {
        Row: {
          answers: Json
          created_at: string
          difficulty_distribution: Json | null
          id: string
          recommended: boolean
          score: number
          track_id: string
          user_id: string
        }
        Insert: {
          answers: Json
          created_at?: string
          difficulty_distribution?: Json | null
          id?: string
          recommended?: boolean
          score: number
          track_id: string
          user_id: string
        }
        Update: {
          answers?: Json
          created_at?: string
          difficulty_distribution?: Json | null
          id?: string
          recommended?: boolean
          score?: number
          track_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_results_track_id_fkey"
            columns: ["track_id"]
            isOneToOne: false
            referencedRelation: "tracks"
            referencedColumns: ["id"]
          },
        ]
      }
      resume_templates: {
        Row: {
          category: string
          created_at: string | null
          description: string
          id: string
          is_premium: boolean | null
          preview_image: string | null
          template_name: string
        }
        Insert: {
          category: string
          created_at?: string | null
          description: string
          id?: string
          is_premium?: boolean | null
          preview_image?: string | null
          template_name: string
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string
          id?: string
          is_premium?: boolean | null
          preview_image?: string | null
          template_name?: string
        }
        Relationships: []
      }
      skills_assessments: {
        Row: {
          assessment_score: number
          completed_at: string | null
          id: string
          proficiency_level: number
          skill_category: string
          skill_name: string
          user_id: string | null
        }
        Insert: {
          assessment_score: number
          completed_at?: string | null
          id?: string
          proficiency_level: number
          skill_category: string
          skill_name: string
          user_id?: string | null
        }
        Update: {
          assessment_score?: number
          completed_at?: string | null
          id?: string
          proficiency_level?: number
          skill_category?: string
          skill_name?: string
          user_id?: string | null
        }
        Relationships: []
      }
      "subject data": {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      subjects: {
        Row: {
          created_at: string
          id: string
          resources: Json | null
          semester: number | null
          subject_desc: string | null
          subject_name: string
          track_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          resources?: Json | null
          semester?: number | null
          subject_desc?: string | null
          subject_name: string
          track_id: string
        }
        Update: {
          created_at?: string
          id?: string
          resources?: Json | null
          semester?: number | null
          subject_desc?: string | null
          subject_name?: string
          track_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subjects_track_id_fkey"
            columns: ["track_id"]
            isOneToOne: false
            referencedRelation: "tracks"
            referencedColumns: ["id"]
          },
        ]
      }
      tracks: {
        Row: {
          color_scheme: string | null
          created_at: string
          description: string
          future_scope: string
          icon: string | null
          id: string
          track_name: string
        }
        Insert: {
          color_scheme?: string | null
          created_at?: string
          description: string
          future_scope: string
          icon?: string | null
          id?: string
          track_name: string
        }
        Update: {
          color_scheme?: string | null
          created_at?: string
          description?: string
          future_scope?: string
          icon?: string | null
          id?: string
          track_name?: string
        }
        Relationships: []
      }
      user_badges: {
        Row: {
          badge_id: string | null
          earned_at: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          badge_id?: string | null
          earned_at?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          badge_id?: string | null
          earned_at?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
        ]
      }
      user_progress: {
        Row: {
          completed_modules: number | null
          created_at: string | null
          id: string
          last_activity: string | null
          progress_percentage: number | null
          total_modules: number
          track_id: string | null
          user_id: string | null
        }
        Insert: {
          completed_modules?: number | null
          created_at?: string | null
          id?: string
          last_activity?: string | null
          progress_percentage?: number | null
          total_modules: number
          track_id?: string | null
          user_id?: string | null
        }
        Update: {
          completed_modules?: number | null
          created_at?: string | null
          id?: string
          last_activity?: string | null
          progress_percentage?: number | null
          total_modules?: number
          track_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_progress_track_id_fkey"
            columns: ["track_id"]
            isOneToOne: false
            referencedRelation: "tracks"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
