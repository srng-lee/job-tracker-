import Anthropic from "npm:@anthropic-ai/sdk@^0.40.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { company, position, notes } = await req.json();

    if (!company || !position) {
      return new Response(
        JSON.stringify({ error: "company와 position은 필수입니다." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const client = new Anthropic({
      apiKey: Deno.env.get("ANTHROPIC_API_KEY"),
    });

    const prompt = `당신은 IT 기업 채용 면접 전문가입니다.
다음 지원 정보를 바탕으로 실전 면접 대비 질문을 생성해주세요.

- 회사: ${company}
- 포지션: ${position}${notes ? `\n- 추가 정보: ${notes}` : ""}

아래 형식으로 10개의 면접 질문을 생성해주세요:

**기술 질문 (5개)**
1. [질문]
2. [질문]
3. [질문]
4. [질문]
5. [질문]

**인성/경험 질문 (3개)**
6. [질문]
7. [질문]
8. [질문]

**회사/직무 관련 질문 (2개)**
9. [질문]
10. [질문]

질문은 구체적이고 실용적으로 작성해주세요.`;

    const response = await client.messages.create({
      model: "claude-opus-4-8",
      max_tokens: 2048,
      thinking: { type: "adaptive" },
      messages: [{ role: "user", content: prompt }],
    });

    const textBlock = response.content.find((b) => b.type === "text");
    const questions = textBlock?.text ?? "";

    return new Response(
      JSON.stringify({ questions }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "면접 질문 생성에 실패했습니다." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
