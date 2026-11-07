export type TargetAudience =
  | "Class 9"
  | "Class 10"
  | "Class 11"
  | "Class 12"
  | "College"
  | "General Audience";

export type DifficultyLevel = "Beginner" | "Intermediate" | "Advanced";

export type LanguageOption = "English" | "Bengali" | "Hindi";

export type ScientificStatusCategory =
  | "Established Empirical Law / Finding"
  | "Simplified / Phenomenological Model"
  | "Theoretical Hypothesis"
  | "Unresolved Scientific Question"
  | "Multi-Faceted / Complex Framework";

export interface PhysicsEngineResponse {
  concept_name: string;
  target_audience: TargetAudience;
  difficulty_level: DifficultyLevel;
  language: LanguageOption;
  scientific_status: {
    category: ScientificStatusCategory;
    scope_note: string;
  };
  core_intuition: string;
  explanation: string;
  mathematics: {
    has_formula: boolean;
    latex_formula: string | null;
    variables: Array<{
      symbol: string;
      meaning: string;
      si_unit: string;
    }>;
    validity_conditions: string | null;
  };
  analogies: Array<{
    theme: "Everyday Life" | "Mechanical / Tactile" | "Pop Culture / Modern Tech";
    title: string;
    story: string;
    mapping: string;
    where_it_breaks_down: string;
  }>;
  misconception_or_boundary: {
    has_documented_misconception: boolean;
    title: string;
    explanation_or_context: string;
    scientific_reality: string;
  };
  video_script: {
    target_duration: "Approximately 60 seconds";
    hook_act1: {
      timecode: "0:00 - 0:10";
      visual_direction: string;
      on_screen_text: string;
      voiceover_narration: string;
    };
    explanation_act2: {
      timecode: "0:10 - 0:45";
      visual_direction: string;
      on_screen_text: string;
      voiceover_narration: string;
    };
    payoff_act3: {
      timecode: "0:45 - 1:00";
      visual_direction: string;
      on_screen_text: string;
      voiceover_narration: string;
    };
  };
  demonstrations: {
    diy_household: {
      title: string;
      materials: string[];
      steps: string[];
      safety_notice: string;
    };
    school_lab: {
      applicable: boolean;
      apparatus: string[];
      setup_summary: string;
      safety_notice: string;
    } | null;
    digital_simulation: {
      concept_visualized: string;
      suggested_tool_or_animation_flow: string;
    };
  };
  is_valid_physics_topic?: boolean;
  topic_notice?: string;
  is_quota_exhausted?: boolean;
  quota_notice?: string;
  generation_source?: 'live_ai' | 'preloaded_preset' | 'offline_fallback';
}

export interface GenerateRequestPayload {
  topic: string;
  targetAudience: TargetAudience;
  difficultyLevel: DifficultyLevel;
  language: LanguageOption;
  customNotes?: string;
}
