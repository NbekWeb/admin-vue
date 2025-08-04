<template>
	<el-dialog
		v-model="visible"
		title="Добавить описание к устройству"
		width="500px"
		:before-close="onCancel"
	>
		<el-form label-position="top" :model="form" :rules="rules" ref="formRef">
			<el-form-item label="Номер" prop="number">
				<el-input
					v-model="form.number"
					placeholder="Введите номер"
					type="text"
					clearable
					@input="onNumberInput"
				/>
			</el-form-item>

			<el-form-item label="Устройство" prop="device">
				<el-select
					v-model="form.device"
					placeholder="Выберите устройство"
					filterable
				>
					<el-option
						v-for="item in devices"
						:key="item.id"
						:label="item.name"
						:value="item.id"
					/>
				</el-select>
			</el-form-item>
			<el-form-item label="Абонент" prop="user">
				<el-select
					v-model="form.user"
					placeholder="Выберите абонента"
					filterable
				>
					<el-option
						v-for="subscriber in subscribers"
						:key="subscriber.id"
						:label="`${subscriber.first_name} ${subscriber.last_name}`"
						:value="subscriber.id"
					/>
				</el-select>
			</el-form-item>
		</el-form>

		<template #footer>
			<el-button @click="onCancel">Отмена</el-button>
			<el-button type="primary" @click="onSubmit">Сохранить</el-button>
		</template>
	</el-dialog>
</template>

<script setup>
import { ref, defineExpose, defineEmits } from "vue";
import { ElMessage } from "element-plus";
import { getDevice_API } from "@/service/device";
import { getUser_API } from "@/service/user";
import { addEnCoder_API, editEnCoder_API } from "@/service/encoder";

const emit = defineEmits(["update:modelValue", "create"]);

const visible = ref(false);

const formRef = ref(null);
const form = ref({
	device: null,
	number: null,
	user: null,
});

const devices = ref([]);
const subscribers = ref([]);

const rules = {
	number: [{ required: true, message: "Введите номер", trigger: "blur" }],
	device: [
		{ required: true, message: "Выберите устройство", trigger: "change" },
	],
	user: [{ required: true, message: "Выберите абонента", trigger: "change" }],
};

const onNumberInput = (value) => {
	form.value.number = value.replace(/[^\d]/g, "");
};

const fetchDevices = async () => {
	const [error, res] = await getDevice_API();
	if (!error) devices.value = res.results;
};

const fetchSubscribers = async () => {
	const [error, res] = await getUser_API();
	if (!error) subscribers.value = res.data.results;
};

const onSubmit = () => {
	formRef.value.validate(async (valid) => {
		if (valid) {
			const [error] = form.value.id
				? await editEnCoder_API(form.value)
				: await addEnCoder_API(form.value);

			if (error) {
				ElMessage.error("Ошибка");
				visible.value = false;
				return;
			}
			emit("create");
			visible.value = false;
			ElMessage.success(
				form.value.id ? "Тариф устройства был отредактирован." : "Тариф на устройство создан"
			);
		}
	});
};

function open(data = null, userRow = null) {
	visible.value = true;
	console.log("data", data);
	console.log("userRow", userRow);
	form.value = userRow
		? { ...userRow, device: userRow.device.id }
		: { device: null, number: null, user: null };
	if (data) {
		form.value.user = data.id;
	}
	fetchDevices();
	fetchSubscribers();
}

const onCancel = () => {
	visible.value = false;
};

defineExpose({
	open,
});
</script>

<style scoped>
.card-header {
	/* optional styling */
}
</style>
