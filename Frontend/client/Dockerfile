# ���������� ����������� ����� Node.js ��� �������
FROM node:18

# ������������� ������� ����������
WORKDIR /app

# �������� package.json � package-lock.json
COPY package*.json ./

# ������������� �����������
RUN npm install

# �������� ��������� ��� ����������
COPY . .

# ������������� ���������� ��������� ��� API
ENV VITE_API_URL=http://back:5044/api/Task

# �������� ����������
RUN npm run build

# ������������� serve ��� ������������ ����������� ������
RUN npm install -g serve

# ��������� ���� 3000
EXPOSE 3000

# ��������� ����������
CMD ["serve", "-s", "dist", "-l", "3000"]