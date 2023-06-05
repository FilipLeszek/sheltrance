INSERT INTO "Shelter" VALUES (1000, 'shelter', 'adres');
INSERT INTO "Shelter" VALUES (1001, 'shelter2', 'adres2');
INSERT INTO "AppUser" VALUES (1000, 'test1000@gmail.com', '$2b$10$Jc6TQG45a.zh8HQiENkzGe2k3W.mZM.1aGbGjAgf.FgNduMU0tWde', 'Jan', 'Kowalski', '123456789', 'manager', 1000);
INSERT INTO "AppUser" VALUES (1001, 'test1001@gmail.com', '$2b$10$Jc6TQG45a.zh8HQiENkzGe2k3W.mZM.1aGbGjAgf.FgNduMU0tWde', 'Jan', 'Nowak', '123456789', 'manager', 1000);
INSERT INTO "AppUser" VALUES (1002, 'test1002@gmail.com', '$2b$10$Jc6TQG45a.zh8HQiENkzGe2k3W.mZM.1aGbGjAgf.FgNduMU0tWde', 'Janusz', 'Nosacz', '123456789', 'manager', 1000);
INSERT INTO "AppUser" VALUES (1003, 'test1003@gmail.com', '$2b$10$Jc6TQG45a.zh8HQiENkzGe2k3W.mZM.1aGbGjAgf.FgNduMU0tWde', 'Król', 'Szczurów', '123456789', 'manager', 1000);
INSERT INTO "AppUser" VALUES (1004, 'test1004@gmail.com', '$2b$10$Jc6TQG45a.zh8HQiENkzGe2k3W.mZM.1aGbGjAgf.FgNduMU0tWde', 'Pleśniogryz', 'TekstDolny', '123456789', 'manager', 1000);
INSERT INTO "AppUser" VALUES (1005, 'test1005@gmail.com', '$2b$10$Jc6TQG45a.zh8HQiENkzGe2k3W.mZM.1aGbGjAgf.FgNduMU0tWde', 'Anna', 'Kowalska', '123456789', 'manager', 1001);
INSERT INTO "Adoption" VALUES (1000, 1, 'animalName1', 'clientName1', 1000, TRUE, 1000);
INSERT INTO "Adoption" VALUES (1001, 2, 'animalName2', 'clientName2', 1000, TRUE, 1000);
INSERT INTO "Adoption" VALUES (1002, 3, 'animalName3', 'clientName3', 1000, TRUE, 1000);
INSERT INTO "Adoption" VALUES (1003, 1, 'animalName1', 'clientName1', 1001, TRUE, 1000);
INSERT INTO "Adoption" VALUES (1004, 2, 'animalName2', 'clientName2', 1002, TRUE, 1000);
INSERT INTO "Adoption" VALUES (1005, 3, 'animalName3', 'clientName3', 1003, TRUE, 1000);

-- kazda adopcja musi miec 4 etapy
INSERT INTO "AdoptionStage" VALUES (DEFAULT, '', '', '', FALSE, 1000);
INSERT INTO "AdoptionStage" VALUES (DEFAULT, '', '', '', FALSE, 1000);
INSERT INTO "AdoptionStage" VALUES (DEFAULT, '', '', '', FALSE, 1000);
INSERT INTO "AdoptionStage" VALUES (DEFAULT, '', '', '', FALSE, 1000);

INSERT INTO "AdoptionStage" VALUES (DEFAULT, '', '', '', FALSE, 1001);
INSERT INTO "AdoptionStage" VALUES (DEFAULT, '', '', '', FALSE, 1001);
INSERT INTO "AdoptionStage" VALUES (DEFAULT, '', '', '', FALSE, 1001);
INSERT INTO "AdoptionStage" VALUES (DEFAULT, '', '', '', FALSE, 1001);

INSERT INTO "AdoptionStage" VALUES (DEFAULT, '', '', '', FALSE, 1002);
INSERT INTO "AdoptionStage" VALUES (DEFAULT, '', '', '', FALSE, 1002);
INSERT INTO "AdoptionStage" VALUES (DEFAULT, '', '', '', FALSE, 1002);
INSERT INTO "AdoptionStage" VALUES (DEFAULT, '', '', '', FALSE, 1002);

INSERT INTO "AdoptionStage" VALUES (DEFAULT, '', '', '', FALSE, 1003);
INSERT INTO "AdoptionStage" VALUES (DEFAULT, '', '', '', FALSE, 1003);
INSERT INTO "AdoptionStage" VALUES (DEFAULT, '', '', '', FALSE, 1003);
INSERT INTO "AdoptionStage" VALUES (DEFAULT, '', '', '', FALSE, 1003);

INSERT INTO "AdoptionStage" VALUES (DEFAULT, '', '', '', FALSE, 1004);
INSERT INTO "AdoptionStage" VALUES (DEFAULT, '', '', '', FALSE, 1004);
INSERT INTO "AdoptionStage" VALUES (DEFAULT, '', '', '', FALSE, 1004);
INSERT INTO "AdoptionStage" VALUES (DEFAULT, '', '', '', FALSE, 1004);

INSERT INTO "AdoptionStage" VALUES (DEFAULT, 'Wszystko poszlo sprawnie', '', '', TRUE, 1005);
INSERT INTO "AdoptionStage" VALUES (DEFAULT, '', '', '', TRUE, 1005);
INSERT INTO "AdoptionStage" VALUES (DEFAULT, '', '', '', TRUE, 1005);
INSERT INTO "AdoptionStage" VALUES (DEFAULT, '', '', '', TRUE, 1005);

INSERT INTO "Message" VALUES (DEFAULT, DEFAULT, 1, 'Reksio', 'Anna', 'Kowalska','test1@gmail.com', 1000,  'message', FALSE, 1000);
INSERT INTO "Message" VALUES (DEFAULT, DEFAULT, 1, 'Peppa', 'Tomek', 'Wysoki','test2@gmail.com', 1000,  'message', FALSE, 1000);
INSERT INTO "Message" VALUES (DEFAULT, DEFAULT, 1, 'Rufus', 'Adam', 'Bolek','tes3@gmail.com', 1002, 'message', FALSE, 1000);
INSERT INTO "Message" VALUES (DEFAULT, DEFAULT, 1, 'Brak', 'Joanna', 'Nieziemska','test4@gmail.com', 1003, 'message', FALSE, 1000);
INSERT INTO "Message" VALUES (DEFAULT, DEFAULT, 1, 'Kot', 'Krzysztof', 'Kupiec','test5@gmail.com', 1004, 'message', FALSE, 1000);
INSERT INTO "Message" VALUES (DEFAULT, DEFAULT, 1, 'Terminator', 'Anna', 'Nowak','test6@gmail.com', NULL, 'message', FALSE, 1000);
INSERT INTO "Message" VALUES (DEFAULT, DEFAULT, 1, 'Brutus', 'Wiktor', 'Lubiec','test7@gmail.com', NULL, 'message', FALSE, 1001);
INSERT INTO "Message" VALUES (DEFAULT, DEFAULT, 1, 'Puszek', 'Andrzej', 'Kosmita','test8@gmail.com', NULL, 'message', FALSE, 1001);