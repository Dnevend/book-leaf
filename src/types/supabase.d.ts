export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      leaf: {
        Row: {
          cover: string | null
          created_at: string
          desc: string | null
          id: number
          name: string | null
          share_id: string | null
          tags: string[] | null
          user_id: string | null
        }
        Insert: {
          cover?: string | null
          created_at?: string
          desc?: string | null
          id?: number
          name?: string | null
          share_id?: string | null
          tags?: string[] | null
          user_id?: string | null
        }
        Update: {
          cover?: string | null
          created_at?: string
          desc?: string | null
          id?: number
          name?: string | null
          share_id?: string | null
          tags?: string[] | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_leaf_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      leaf_items: {
        Row: {
          id: number
          info: Json | null
          leaf_id: string | null
          prop: Json | null
        }
        Insert: {
          id?: number
          info?: Json | null
          leaf_id?: string | null
          prop?: Json | null
        }
        Update: {
          id?: number
          info?: Json | null
          leaf_id?: string | null
          prop?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "public_leaf_items_leaf_id_fkey"
            columns: ["leaf_id"]
            isOneToOne: false
            referencedRelation: "leaf"
            referencedColumns: ["share_id"]
          },
        ]
      }
      user_conf: {
        Row: {
          avatar: string | null
          bio: string | null
          id: number
          links: Json | null
          user_id: string | null
          username: string | null
        }
        Insert: {
          avatar?: string | null
          bio?: string | null
          id?: number
          links?: Json | null
          user_id?: string | null
          username?: string | null
        }
        Update: {
          avatar?: string | null
          bio?: string | null
          id?: number
          links?: Json | null
          user_id?: string | null
          username?: string | null
        }
        Relationships: []
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
