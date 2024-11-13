insert into game(game_id, season_name, away_team_name, home_team_name, stadium_name, game_datetime) values(
       1, '2024 KBO', '기아', 'LG', '잠실 야구장', now()
);

insert into purchase(purchase_id, member_uuid, vendor, created_at, updated_at, idempotency_key, total_price, canceled, reservation_id, game_id, grade_name, is_deleted) values
       (1, 'abda6065-07ac-4850-9144-aa280fcc6e8a', 'CARD', now(), now(), '85252273-0072-42a0-a04e-cc5cf6373b1f', 12000, false, 'T328204945', 1, '1루 내야', false),
       (2, 'abda6065-07ac-4850-9144-aa280fcc6e8a', 'CARD', now(), now(), '85252273-0072-42a0-a04e-cc5cf6373b1g', 15000, false, 'T328204947', 1, '1루 내야', false),
       (3, 'abda6065-07ac-4850-9144-aa280fcc6e8a', 'CARD', now(), now(), '85252273-0072-42a0-a04e-cc5cf6373b1a', 13000, false, 'T328204946', 1, '1루 내야', false),
       (4, 'abda6065-07ac-4850-9144-aa280fcc6e8a', 'CARD', now(), now(), '85252273-0072-42a0-a04e-cc5cf6373b12', 13000, false, 'T328204946', 1, '1루 내야', false),
       (5, 'abda6065-07ac-4850-9144-aa280fcc6e8a', 'CARD', now(), now(), '85252273-0072-42a0-a04e-cc5cf6373b15', 13000, false, 'T328204946', 1, '1루 내야', false),
       (6, 'abda6065-07ac-4850-9144-aa280fcc6e8a', 'CARD', now(), now(), '85252273-0072-42a0-a04e-cc5cf6373b17', 13000, false, 'T328204946', 1, '1루 내야', false),
       (7, 'abda6065-07ac-4850-9144-aa280fcc6e8a', 'CARD', now(), now(), '85252273-0072-42a0-a04e-cc5cf6373b10', 13000, false, 'T328204946', 1, '1루 내야', false),
       (8, 'abda6065-07ac-4850-9144-aa280fcc6e8a', 'CARD', now(), now(), '85252273-0072-42a0-a04e-cc5cf6373b1e', 13000, false, 'T328204946', 1, '1루 내야', false),
       (9, 'abda6065-07ac-4850-9144-aa280fcc6e8a', 'CARD', now(), now(), '85252273-0072-42a0-a04e-cc5cf6373b1y', 13000, false, 'T328204946', 1, '1루 내야', false),
       (10, 'abda6065-07ac-4850-9144-aa280fcc6e8a', 'CARD', now(), now(), '85252273-0072-42a0-a04e-cc5cf6373b1o', 13000, false, 'T328204946', 1, '1루 내야', false),
       (11, 'abda6065-07ac-4850-9144-aa280fcc6e8a', 'CARD', now(), now(), '85252273-0072-42a0-a04e-cc5cf6373b1p', 13000, false, 'T328204946', 1, '1루 내야', false),
       (12, 'abda6065-07ac-4850-9144-aa280fcc6e8a', 'CARD', now(), now(), '85252273-0072-42a0-a04e-cc5cf6373b1v', 13000, false, 'T328204946', 1, '1루 내야', false),
       (13, 'abda6065-07ac-4850-9144-aa280fcc6e8a', 'CARD', now(), now(), '85252273-0072-42a0-a04e-cc5cf6373b1n', 13000, false, 'T328204946', 1, '1루 내야', false),
       (14, 'abda6065-07ac-4850-9144-aa280fcc6e8a', 'CARD', now(), now(), '85252273-0072-42a0-a04e-cc5cf6373b1m', 13000, false, 'T328204946', 1, '1루 내야', false),
       (15, 'abda6065-07ac-4850-9144-aa280fcc6e8a', 'CARD', now(), now(), '85252273-0072-42a0-a04e-cc5cf6373b2m', 13000, false, 'T328204946', 1, '1루 내야', false),
       (16, 'abda6065-07ac-4850-9144-aa280fcc6e8a', 'CARD', now(), now(), '85252273-0072-42a0-a04e-cc5cf6373b32', 13000, false, 'T328204946', 1, '1루 내야', false);
