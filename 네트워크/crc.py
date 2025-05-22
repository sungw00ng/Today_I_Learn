def xor(a, b):
    """
    두 개의 이진 문자열에 대해 비트 단위 XOR 연산을 수행합니다.
    입력 문자열 'a'와 'b'는 길이가 같다고 가정합니다.

    Args:
        a (str): 첫 번째 이진 문자열.
        b (str): 두 번째 이진 문자열.

    Returns:
        str: XOR 연산의 결과.
    """
    result = []
    for i in range(len(a)):
        result.append('0' if a[i] == b[i] else '1')
    return ''.join(result)

def mod2_division(data, generator):
    """
    CRC 계산의 핵심인 모듈로-2 이진 나눗셈을 수행합니다.

    Args:
        data (str): 데이터 문자열 (피제수).
        generator (str): 생성 다항식 문자열 (제수).

    Returns:
        str: 나눗셈의 나머지로, CRC 체크섬이 됩니다.
             이 값은 (생성기 길이 - 1) 비트 길이가 됩니다.
    """
    pick = len(generator)
    tmp = data[:pick]

    while pick < len(data):
        if tmp[0] == '1':
            tmp = xor(tmp, generator)[1:] + data[pick]
        else:
            tmp = tmp[1:] + data[pick]
        pick += 1

    if tmp[0] == '1':
        tmp = xor(tmp, generator)
    else:
        pass

    return tmp[1:]

# --- CRC 계산을 위한 공통 설정 ---
example_data = '1101' # 예시 데이터
example_generator = '1011' # 예시 생성기 (CRC-3)

# CRC 계산을 위해 데이터에 (생성기 길이 - 1)개의 0을 추가합니다.
# 생성기 길이가 4이므로 3개의 0을 추가합니다.
example_appended_data = example_data + '0' * (len(example_generator) - 1)

# CRC 체크섬 계산
example_crc = mod2_division(example_appended_data, example_generator)

# 전송될 데이터 (원본 데이터 + CRC)
transmitted_data = example_data + example_crc

print(f"원본 데이터: {example_data}")
print(f"생성기: {example_generator}")
print(f"계산된 CRC 체크섬: {example_crc}")
print(f"전송될 데이터 (원본 + CRC): {transmitted_data}")

print("\n" + "="*30 + "\n") # 구분선

# --- 시나리오 1: 오류 없음 (No Error Scenario) ---
print("--- 시나리오 1: 오류 없음 ---")
# 수신된 데이터가 오류 없이 전송되었다고 가정합니다.
received_data_no_error = transmitted_data
print(f"수신된 데이터 (오류 없음): {received_data_no_error}")

# 수신된 데이터를 생성기로 나눕니다.
received_crc_check_no_error = mod2_division(received_data_no_error, example_generator)

# 나머지가 모두 0인지 확인합니다.
if received_crc_check_no_error == '0' * (len(example_generator) - 1):
    print(f"수신 데이터 검증 결과: 오류 없음 (나머지: {received_crc_check_no_error})")
else:
    print(f"수신 데이터 검증 결과: 오류 발생! (나머지: {received_crc_check_no_error})")

print("\n" + "="*30 + "\n") # 구분선

# --- 시나리오 2: 오류 발생 (Error Scenario) ---
print("--- 시나리오 2: 오류 발생 ---")
# 전송 중 데이터에 오류가 발생했다고 가정합니다.
# 예를 들어, 전송된 데이터의 한 비트가 뒤집혔다고 가정합니다.
# 여기서는 전송된 데이터의 세 번째 비트 (인덱스 2)를 뒤집어 봅시다.
error_data_list = list(transmitted_data)
if len(error_data_list) > 2: # 인덱스 2가 존재하는지 확인
    error_data_list[2] = '0' if error_data_list[2] == '1' else '1'
error_transmitted_data = "".join(error_data_list)

print(f"오류가 발생한 수신 데이터: {error_transmitted_data}")

# 오류가 발생한 데이터를 생성기로 나눕니다.
received_crc_check_error = mod2_division(error_transmitted_data, example_generator)

# 나머지가 모두 0인지 확인합니다.
if received_crc_check_error == '0' * (len(example_generator) - 1):
    print(f"수신 데이터 검증 결과: 오류 없음 (나머지: {received_crc_check_error})")
else:
    print(f"수신 데이터 검증 결과: 오류 발생! (나머지: {received_crc_check_error})")
