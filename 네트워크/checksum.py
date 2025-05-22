# 1의 보수 체크섬 계산 함수
def ones_complement_sum(data: list[int]) -> int:
    checksum = 0
    for word in data:
        checksum += word
        # 16비트 초과 시 순환 캐리 처리
        if checksum > 0xFFFF:
            checksum = (checksum & 0xFFFF) + 1
    # 최종 합의 1의 보수를 취해 체크섬 생성
    return ~checksum & 0xFFFF

# 수신 측 검증 함수
def verify_checksum(data: list[int], checksum: int) -> bool:
    # 데이터 + 체크섬을 모두 더함
    total = sum(data) + checksum
    # 순환 캐리 처리
    while total > 0xFFFF:
        total = (total & 0xFFFF) + (total >> 16)
    # 전체 합이 0xFFFF면 정상
    return total == 0xFFFF

# 패킷 A: 일반적인 IPv4 헤더 예시
data_A = [
    0x4500,  # 버전 + IHL
    0x003C,  # 총 길이
    0x1C46,  # 식별자
    0x4000,  # 플래그 + 오프셋
    0x4006,  # TTL + 프로토콜
    0x0000,  # 체크섬 자리 (계산 전이므로 0)
    0xC0A8,  # 출발지 IP (192.168.0.1의 상위)
    0x0001,  # 출발지 IP (192.168.0.1의 하위)
    0xC0A8,  # 목적지 IP (192.168.0.199의 상위)
    0x00C7   # 목적지 IP (192.168.0.199의 하위)
]

# 패킷 B: 일부 필드만 다른 IPv4 헤더 예시
data_B = [
    0x4500,
    0x0050,  # 총 길이 다름
    0x3C00,  # 식별자 다름
    0x4000,
    0x4006,
    0x0000,
    0xC0A8,
    0x0001,
    0xC0A8,
    0x00C7
]

# 체크섬 계산
chk_A = ones_complement_sum(data_A)
chk_B = ones_complement_sum(data_B)

# 체크섬 출력
print(f"[패킷 A] 체크섬: 0x{chk_A:04X}")
print(f"[패킷 B] 체크섬: 0x{chk_B:04X}")

# 수신 측에서의 체크섬 검증
result_A = verify_checksum(data_A, chk_A)
result_B = verify_checksum(data_B, chk_B)

# 결과 출력
print(f"[패킷 A] 검증 결과: {result_A}")  # True → 정상
print(f"[패킷 B] 검증 결과: {result_B}")  # True → 정상
