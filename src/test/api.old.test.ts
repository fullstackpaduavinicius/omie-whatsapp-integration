import request from "supertest";
import app from "../server"; 

describe("API de envio de mensagens", () => {
  it("deve retornar erro ao enviar uma requisição sem dados", async () => {
    const response = await request(app).post("/enviar-mensagem").send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("erro");
  });

  it("deve retornar erro se faltar número ou mensagem", async () => {
    const response1 = await request(app).post("/enviar-mensagem").send({ numero: "123456789" });
    expect(response1.status).toBe(400);

    const response2 = await request(app).post("/enviar-mensagem").send({ mensagem: "Olá" });
    expect(response2.status).toBe(400);
  });
});
