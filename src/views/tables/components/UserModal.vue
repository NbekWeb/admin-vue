<template>
	<el-dialog
		v-model="visible"
		:title="form.id ? 'Изменить абонента' : 'Создать абонента'"
		width="500px"
		:before-close="onCancel"
	>
		<el-form label-position="top" :model="form" :rules="rules" ref="formRef">
			<el-form-item label="Имя" prop="first_name">
				<el-input v-model="form.first_name" placeholder="Введите имя" />
			</el-form-item>

			<el-form-item label="Фамилия" prop="last_name">
				<el-input v-model="form.last_name" placeholder="Введите фамилию" />
			</el-form-item>

			<el-form-item label="Адрес" prop="address">
				<el-input v-model="form.address" placeholder="Введите адрес" />
			</el-form-item>

			<el-form-item label="Tелефон" prop="address">
				<el-input v-model="form.phone" placeholder="Введите телефон" />
			</el-form-item>
			<el-form-item label="Электронная почта" prop="email">
				<el-input
					type="email"
					v-model="form.email"
					placeholder="Введите электронная почта"
				/>
			</el-form-item>
			<el-form-item label="Квартира" prop="apartment">
				<el-input
					v-model="form.apartment"
					placeholder="Введите номер квартиры"
				/>
			</el-form-item>

			<el-form-item label="FIAS код" prop="fias">
				<el-input v-model="form.fias" placeholder="Введите FIAS код" />
			</el-form-item>

			<el-form-item label="Тариф" prop="tariff_plan">
				<el-select v-model="form.tariff_plan" placeholder="Выберите тариф">
					<el-option :value="item" :label="item.name" v-for="item in tariffs" :key="item.id" />
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
import { addUser_API, editUser_API } from "@/service/user";
import { getTariff_API } from "@/service/tariff";

const emit = defineEmits(["create"]);

const visible = ref(false);
const formRef = ref(null);

const form = ref({
	first_name: "",
	last_name: "",
	address: "",
	apartment: "",
	phone: "",
	email: "",
	fias: "",
	tariff_plan: null,
});

const rules = {
	first_name: [{ required: true, message: "Введите имя", trigger: "blur" }],
	last_name: [{ required: true, message: "Введите фамилию", trigger: "blur" }],
	address: [{ required: true, message: "Введите адрес", trigger: "blur" }],
	apartment: [
		{ required: true, message: "Введите номер квартиры", trigger: "blur" },
	],
	tariff_plan: [
		{ required: true, message: "Выберите тариф", trigger: "change" },
	],
};

const tariffs = ref([]);

const loadTariffs = async () => {
	console.log("11");

	const [err, res] = await getTariff_API();
	if (err) return;
	console.log("res", res);

	tariffs.value = res.data.results;
};

function open(data = null) {
	loadTariffs();
	if (data) {
		form.value = { ...data };
	} else {
		form.value = {
			first_name: "",
			last_name: "",
			address: "",
			apartment: "",
			email: "",
			phone: "",
			fias: "",
			tariff_plan: null,
		};
	}
	visible.value = true;
}

const onSubmit = () => {
	formRef.value.validate(async (valid) => {
		if (!valid) return;

		const [error] = form.value.id
			? await editUser_API(form.value)
			: await addUser_API(form.value);

		if (error) {
			ElMessage.error("Ошибка при сохранении");
			return;
		}

		ElMessage.success(form.value.id ? "Абонент изменен" : "Абонент создан");
		emit("create");
		visible.value = false;
	});
};

const onCancel = () => {
	visible.value = false;
};

defineExpose({ open });
</script>
