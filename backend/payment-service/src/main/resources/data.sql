insert into game(game_id, season_name, away_team_name, home_team_name, stadium_name, game_datetime) values(
       1, '2024 KBO', '기아', 'LG', '잠실 야구장', now()
);

insert into purchase(purchase_id, member_uuid, vendor, created_at, updated_at, idempotency_key, total_price, canceled, reservation_id, game_id, grade_id, grade_name, is_deleted) values
       (1, '84158567-d01d-4264-8244-d65ed57f1262', 'PAYMENT', now(), now(), '85252273-0072-42a0-a04e-cc5cf6373b1f', 12000, false, 'T328204945', 1, 1,'1루 내야', false),
       (2, '84158567-d01d-4264-8244-d65ed57f1262', 'PAYMENT', now(), now(), '85252273-0072-42a0-a04e-cc5cf6373b1g', 15000, false, 'T328204947', 1, 1,'1루 내야', false),
       (3, '84158567-d01d-4264-8244-d65ed57f1262', 'PAYMENT', now(), now(), '85252273-0072-42a0-a04e-cc5cf6373b1a', 13000, false, 'T328204946', 1, 1,'1루 내야', false),
       (4, '84158567-d01d-4264-8244-d65ed57f1262', 'PAYMENT', now(), now(), '84158567-d01d-4264-8244-d65ed57f1262', 13000, false, 'T328204946', 1, 1,'1루 내야', false),
       (5, '84158567-d01d-4264-8244-d65ed57f1262', 'PAYMENT', now(), now(), '85252273-0072-42a0-a04e-cc5cf6373b15', 13000, false, 'T328204946', 1, 1,'1루 내야', false),
       (6, '84158567-d01d-4264-8244-d65ed57f1262', 'PAYMENT', now(), now(), '85252273-0072-42a0-a04e-cc5cf6373b17', 13000, false, 'T328204946', 1, 1,'1루 내야', false),
       (7, '84158567-d01d-4264-8244-d65ed57f1262', 'PAYMENT', now(), now(), '85252273-0072-42a0-a04e-cc5cf6373b10', 13000, false, 'T328204946', 1, 1,'1루 내야', false),
       (8, '84158567-d01d-4264-8244-d65ed57f1262', 'PAYMENT', now(), now(), '85252273-0072-42a0-a04e-cc5cf6373b1e', 13000, false, 'T328204946', 1, 1,'1루 내야', false),
       (9, '84158567-d01d-4264-8244-d65ed57f1262', 'PAYMENT', now(), now(), '85252273-0072-42a0-a04e-cc5cf6373b1y', 13000, false, 'T328204946', 1, 1,'1루 내야', false),
       (10, '84158567-d01d-4264-8244-d65ed57f1262', 'PAYMENT', now(), now(), '85252273-0072-42a0-a04e-cc5cf6373b1o', 13000, false, 'T328204946', 1, 1,'1루 내야', false),
       (11, '84158567-d01d-4264-8244-d65ed57f1262', 'PAYMENT', now(), now(), '85252273-0072-42a0-a04e-cc5cf6373b1p', 13000, false, 'T328204946', 1, 1,'1루 내야', false),
       (12, '84158567-d01d-4264-8244-d65ed57f1262', 'PAYMENT', now(), now(), '85252273-0072-42a0-a04e-cc5cf6373b1v', 13000, false, 'T328204946', 1, 1,'1루 내야', false),
       (13, '84158567-d01d-4264-8244-d65ed57f1262', 'PAYMENT', now(), now(), '85252273-0072-42a0-a04e-cc5cf6373b1n', 13000, false, 'T328204946', 1, 1,'1루 내야', false),
       (14, '84158567-d01d-4264-8244-d65ed57f1262', 'PAYMENT', now(), now(), '85252273-0072-42a0-a04e-cc5cf6373b1m', 13000, false, 'T328204946', 1, 1,'1루 내야', false),
       (15, '84158567-d01d-4264-8244-d65ed57f1262', 'PAYMENT', now(), now(), '85252273-0072-42a0-a04e-cc5cf6373b2m', 13000, false, 'T328204946', 1, 1,'1루 내야', false),
       (16, '84158567-d01d-4264-8244-d65ed57f1262', 'PAYMENT', now(), now(), '85252273-0072-42a0-a04e-cc5cf6373b32', 13000, false, 'T328204946', 1, 1,'1루 내야', false);

insert into purchase(purchase_id, member_uuid, vendor, created_at, updated_at, idempotency_key, total_price, canceled, reservation_id, game_id, grade_id, grade_name, is_deleted) values
       (17, '84158567-d01d-4264-8244-d65ed57f1262', 'PAYMENT', now(), now(), '85252273-0072-42a0-a04e-cc5cf6373b2f', 12000, true, 'T328204945', 1, 1, '1루 내야', false),
       (18, '84158567-d01d-4264-8244-d65ed57f1262', 'PAYMENT', now(), now(), '85252273-0072-42a0-a04e-cc5cf6373b2g', 15000, true, 'T328204947', 1, 1, '1루 내야', false),
       (19, '84158567-d01d-4264-8244-d65ed57f1262', 'PAYMENT', now(), now(), '85252273-0072-42a0-a04e-cc5cf6373b2a', 13000, true, 'T328204946', 1, 1, '1루 내야', false),
       (20, '84158567-d01d-4264-8244-d65ed57f1262', 'PAYMENT', now(), now(), 'd7cc620d-1e2f-4553-bceb-2cb367bfce2e', 13000, true, 'T328204946', 1, 1, '1루 내야', false),
       (21, '84158567-d01d-4264-8244-d65ed57f1262', 'PAYMENT', now(), now(), '85252273-0072-42a0-a04e-cc5cf6373b25', 13000, true, 'T328204946', 1, 1,'1루 내야', false),
       (22, '84158567-d01d-4264-8244-d65ed57f1262', 'PAYMENT', now(), now(), '85252273-0072-42a0-a04e-cc5cf6373b27', 13000, true, 'T328204946', 1, 1,'1루 내야', false),
       (23, '84158567-d01d-4264-8244-d65ed57f1262', 'PAYMENT', now(), now(), '85252273-0072-42a0-a04e-cc5cf6373b20', 13000, true, 'T328204946', 1, 1,'1루 내야', false),
       (24, '84158567-d01d-4264-8244-d65ed57f1262', 'PAYMENT', now(), now(), '85252273-0072-42a0-a04e-cc5cf6373b21', 13000, true, 'T328204946', 1, 1,'1루 내야', false),
       (25, '84158567-d01d-4264-8244-d65ed57f1262', 'PAYMENT', now(), now(), '85252273-0072-42a0-a04e-cc5cf6373b22', 13000, true, 'T328204946', 1, 1,'1루 내야', false),
       (26, '84158567-d01d-4264-8244-d65ed57f1262', 'PAYMENT', now(), now(), '85252273-0072-42a0-a04e-cc5cf6373b23', 13000, true, 'T328204946', 1, 1,'1루 내야', false),
       (27, '84158567-d01d-4264-8244-d65ed57f1262', 'PAYMENT', now(), now(), '85252273-0072-42a0-a04e-cc5cf6373b24', 13000, true, 'T328204946', 1, 1,'1루 내야', false),
       (28, '84158567-d01d-4264-8244-d65ed57f1262', 'PAYMENT', now(), now(), '85252273-0072-42a0-a04e-cc5cf6373b35', 13000, true, 'T328204946', 1, 1,'1루 내야', false),
       (29, '84158567-d01d-4264-8244-d65ed57f1262', 'PAYMENT', now(), now(), '85252273-0072-42a0-a04e-cc5cf6373b36', 13000, true, 'T328204946', 1, 1,'1루 내야', false),
       (30, '84158567-d01d-4264-8244-d65ed57f1262', 'PAYMENT', now(), now(), '85252273-0072-42a0-a04e-cc5cf6373b37', 13000, true, 'T328204946', 1, 1,'1루 내야', false),
       (31, '84158567-d01d-4264-8244-d65ed57f1262', 'PAYMENT', now(), now(), '85252273-0072-42a0-a04e-cc5cf6373b28', 13000, true, 'T328204946', 1, 1,'1루 내야', false),
       (32, '84158567-d01d-4264-8244-d65ed57f1262', 'PAYMENT', now(), now(), '85252273-0072-42a0-a04e-cc5cf6373b29', 13000, true, 'T328204946', 1, 1,'1루 내야', false),
       (33, '84158567-d01d-4264-8244-d65ed57f1262', 'PAYMENT', now(), now(), '85252273-0072-42a0-a04e-cc5cf6373b30', 13000, true, 'T328204946', 1, 1,'1루 내야', false),
       (34, '84158567-d01d-4264-8244-d65ed57f1262', 'PAYMENT', now(), now(), '85252273-0072-42a0-a04e-cc5cf6373b31', 13000, true, 'T328204946', 1, 1,'1루 내야', false);